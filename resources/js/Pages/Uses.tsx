//@ts-nocheck
import React, {ReactNode} from 'react';
import {Card} from "@/Components/Card";
import {Head} from "@inertiajs/react";
import {SimpleLayout} from "@/Components/SimpleLayout";
import {ToolsSection} from "@/Components/ToolsSection";
import Guest from "@/Layouts/GuestLayout"; // Assuming Section is another component

interface ToolProps {
    title: string;
    href: string;
    children: ReactNode;
}

export function Tool({title, href, children}: ToolProps) {
    return (
        <Card as="li">
            <Card.Title as="h3" href={href}>
                {title}
            </Card.Title>
            <Card.Description>{children}</Card.Description>
        </Card>
    );
}

export default function Uses({tools}: { tools: any }) {
    return (
        <Guest>
            <Head>
                <title>Uses</title>
                <meta
                    name="description"
                    content="Software I use, gadgets I love, and other things I recommend."
                />
            </Head>
            <SimpleLayout
                title="Software I use, gadgets I love, and other things I recommend."
                intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
            >
                <div className="space-y-20">
                    {
                        tools.map((section) => {
                            return (
                                <>
                                    <ToolsSection title={section.sectionName}>
                                        {
                                            section.items.map((item) => {
                                                return (
                                                    <Tool title={item.title} href={''}>
                                                        {item.content}
                                                    </Tool>
                                                )
                                            })
                                        }
                                    </ToolsSection>
                                </>
                            )
                        })
                    }
                </div>
            </SimpleLayout>
        </Guest>
    )
}
