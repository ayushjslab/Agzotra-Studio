export default function HeroLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="importmap"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        imports: {
                            "react": "https://esm.sh/react@19?external=react-dom",
                            "react-dom": "https://esm.sh/react-dom@19",
                            "react/jsx-runtime": "https://esm.sh/react@19/jsx-runtime"
                        }
                    })
                }}
            />
            {children}
        </>
    );
}
