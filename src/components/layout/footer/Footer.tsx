"use client";

import { PAGES_LINKS } from "@/lib/PAGES_LINKS";
import { PAGE_LINK } from "@/types";
import { Clock, Mail, MapPin, Phone, Truck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../ui/Logo";

export default function Footer() {
    const pathname = usePathname();

    return (
        <>
            <section className="bg-coffee mt-30 px-12 max-md:px-5 py-6 text-white text-sm max-md:text-[10px] font-medium">
                
                <Logo media="lg"/>
                
                <div className="grid grid-cols-2 min-md:grid-cols-[40%_30%_30%] pt-3 pb-6 gap-6 w-full h-fit border-b border-white">
                {/* 1 колонка */}
                    <div className="w-full">


                        <div className="flex flex-col light mb-4">
                            Доставка:
                            <span className="inline-flex text-[120%] space-x-1">
                                <Truck/>
                                <p>Осуществляем отправку заказов по Казахстану и встраны СНГ</p>
                            </span>
                        </div>

                        <ul className="space-y-3">
                            {PAGES_LINKS.map((link: PAGE_LINK) => {
                                const isActive = pathname === link.href;

                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="relative flex items-center max-md:text-sm ml-4 opacity-100 hover:opacity-80"
                                        >
                                            {isActive && (
                                                <img
                                                    src="/assets/icons/coffee-bean.png"
                                                    alt="Bean"
                                                    className="h-3 w-3 invert-100 absolute right-1/1 mr-1"
                                                />
                                            )}
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>


                    <div className="w-full space-y-5 flex-col flex">

                        <div>
                            <p className="light">Номер телефона</p>
                            <span className="flex flex-row space-x-2">
                                <Phone className="fill-white mt-1 size-3"/>
                                <p>+7 (771) 527 91 95</p>
                            </span>
                            <div className="inline-flex py-1 px-5 bg-gradient-to-b from-white/2 to-white/10 rounded-xl border-y-2 border-y-white/30 mt-2">
                                <img 
                                    src="/assets/icons/whatsapp.png"
                                    alt="WhatsApp"
                                    className="size-5 mr-1"
                                />
                                <p>WhatsApp</p>
                            </div>
                        </div>

                        <div>
                            <p className="light">Почта</p>
                            <span className="flex flex-row items-center space-x-1">
                                <Mail className="size-4"/>
                                <p>sultanhasenov02@gmail.com</p>
                            </span>
                        </div>

                        <div>
                            <p className="light">Наши соцсети</p>
                            <div className="inline-flex items-center py-1 px-5 bg-gradient-to-b from-white/2 to-white/10 rounded-xl border-y-2 border-y-white/30 ">
                                <img
                                    src="/assets/icons/instagram.png"
                                    className="size-4.5 mr-1"    
                                />
                                <p>Instagram</p>
                            </div>
                        </div>                  
                    </div>

                    <div className="col-span-2 lg:col-span-1 w-full max-md:flex max-md:flex-row">

                        <div className="min-md:mb-5 max-md:w-1/2 mr-[14px]">
                            <p className="light">График работы</p>
                            <span className="inline-flex items-center">
                                <Clock className="size-4 mr-1"/>
                                <p className="flex">Пн-Вс 9.00 - 20.00</p>
                            </span>
                            <p className="light mt-5">График работы</p>
                            <span className="inline-flex items-center">
                                <MapPin className="size-4 mr-1"/>
                                <p>Макатаева 237</p>
                            </span>
                        </div>

                        <div className="light space-y-3">
                            <p>Построение маршрута:</p>
                            <div className="inline-flex items-center space-x-3">
                                <span className="flex flex-col items-center">
                                    <img className="size-7" src="/assets/icons/2gis.png"/>
                                    <p>2GIS</p>
                                </span>
                                <span className="flex flex-col items-center">
                                    <img className="w-5 h-7" src="/assets/icons/GoogleMaps.png"/>
                                    <p>Google</p>
                                </span>
                                <span className="flex flex-col items-center">
                                    <img className="size-7" src="/assets/icons/YandexMaps.png"/>
                                    <p>Yandex</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between pt-6 pb-2 underline light">
                    <p>Публичная оферта</p>
                    <p>Политика конфиденциальности</p>
                </div>
            </section>

            <section className="w-full h-fit p-10 pb-15 flex flex-col justify-center items-center text-black text-sm font-medium">
                    <p>2025. © Все права защищены</p>
                    <p>Разработано с ❤️</p>
            </section>
        </>
    );
}
