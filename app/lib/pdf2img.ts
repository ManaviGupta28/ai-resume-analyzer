export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    isLoading = true;
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
    loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
        // Set the worker source to use local file
        lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        pdfjsLib = lib;
        isLoading = false;
        return lib;
    });

    return loadPromise;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        const lib = await loadPdfJs();

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
        const numPages = pdf.numPages;

        // Calculate total height needed for all pages
        let totalHeight = 0;
        let maxWidth = 0;
        const pageViewports: any[] = [];

        // First pass: calculate dimensions
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 4 });
            pageViewports.push({ page, viewport });
            totalHeight += viewport.height;
            maxWidth = Math.max(maxWidth, viewport.width);
        }

        // Create a canvas large enough for all pages
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = maxWidth;
        canvas.height = totalHeight;

        if (context) {
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Second pass: render all pages
        let currentY = 0;
        for (const { page, viewport } of pageViewports) {
            const renderContext = {
                canvasContext: context!,
                viewport: viewport,
                transform: [1, 0, 0, 1, 0, currentY],
            };
            await page.render(renderContext).promise;
            currentY += viewport.height;
        }

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        // Create a File from the blob with the same name as the pdf
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });

                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob",
                        });
                    }
                },
                "image/png",
                1.0
            ); // Set quality to maximum (1.0)
        });
    } catch (err) {
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${err}`,
        };
    }
}