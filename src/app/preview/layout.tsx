/**
 * Isolated layout for /preview — no navbar, no dev toolbar wrapper,
 * no body padding. Used exclusively by Puppeteer for headless screenshot capture.
 */
export default function PreviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body style={{ margin: 0, padding: 0, background: "#000", overflow: "hidden" }}>
                {children}
            </body>
        </html>
    );
}
