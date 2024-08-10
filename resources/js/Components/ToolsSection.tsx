//@ts-nocheck
import React, { ReactNode } from 'react';
import {Section} from "@/Components/Section"; // Adjust the import path as necessary

interface ToolsSectionProps {
    children: ReactNode;
    [key: string]: any;
}

export function ToolsSection({ children, ...props }: ToolsSectionProps) {
    return (
        <Section {...props}>
            <ul role="list" className="space-y-16">
                {children}
            </ul>
        </Section>
    );
}
