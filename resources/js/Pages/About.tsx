//@ts-nocheck
import {FacebookIcon, InstagramIcon, MailIcon} from "@/Components/SocialIcons";
import {Head} from "@inertiajs/react";
import {Container} from "@/Components/Container";
import SocialLink from "@/Components/SocialLink";
import Guest from "@/Layouts/GuestLayout";

const About = () => {
    return (
        <>
            <Guest>
                <Head>
                    <title>About</title>
                </Head>
                <Container className="mt-16 sm:mt-32">
                    <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                        <div className="lg:pl-20">
                            <div className="max-w-xs px-2.5 lg:max-w-none">
                                <img
                                    src="/Profile/profile1.jpg"
                                    alt=""
                                    className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                                />
                            </div>
                        </div>
                        <div className="lg:order-first lg:row-span-2">
                            <h1 className="text-4xl uppercase font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                                kyaw zay ya
                            </h1>
                            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                                <p>
                                    I’m [ <span
                                    className={'uppercase font-extrabold text-teal-400'}>KYAW ZAY YA</span> ], a travel
                                    and landscape photographer with a deep passion for
                                    capturing the world’s natural beauty and cultural richness. For over 15 years, I’ve
                                    been exploring the globe, camera in hand, documenting the awe-inspiring landscapes
                                    and vibrant cultures I encounter along the way.
                                </p>
                                <p>
                                    From the towering peaks of the Himalayas to the serene beaches of the Caribbean, my
                                    photographs encapsulate the essence of each location, evoking a sense of wonder and
                                    adventure. With a keen eye for detail and a profound appreciation for nature’s
                                    artistry, I strive to create images that not only tell a story but also inspire a
                                    deep connection to our planet.
                                </p>
                                <p>
                                    My work has been featured in numerous publications,I enjoy sharing my knowledge
                                    through workshops and photography tours, helping others to see the world through a
                                    different lens.
                                </p>
                                <p>
                                    Join me on my photographic journey and experience the world in breathtaking detail
                                    by following me on [Social Media Handles/Website].
                                </p>
                            </div>
                        </div>
                        <div className="lg:pl-20">
                            <ul role="list">
                                <SocialLink href="https://www.facebook.com/profile.php?id=100013303245249"
                                            icon={FacebookIcon} className="mt-4">
                                    Follow on Facebook
                                </SocialLink>
                                <SocialLink href="https://www.instagram.com/kyawzayya_pixeltrip" icon={InstagramIcon}
                                            className="mt-4">
                                    Follow on Instagram
                                </SocialLink>
                                <SocialLink
                                    href="mailto:spencer@planetaria.tech"
                                    icon={MailIcon}
                                    className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                                >
                                    kyawzayya0586@gmail.com
                                </SocialLink>
                            </ul>
                        </div>
                    </div>
                </Container>
            </Guest>
        </>
    )
}
export default About
