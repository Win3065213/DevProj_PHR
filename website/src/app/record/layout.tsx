import React, { Suspense } from 'react';

export default function RecordLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <Suspense>{children}</Suspense>
        </main>
    );
}