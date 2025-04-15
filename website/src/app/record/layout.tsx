import React, { Suspense } from 'react';

export default function RecordLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <header>
                <h1>Record Details Section</h1>
            </header>
            <main>
                <Suspense>{children}</Suspense>
            </main>
        </div>
    );
}