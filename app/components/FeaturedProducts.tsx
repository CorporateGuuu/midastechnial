'use client';

import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Product } from "../types";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Products</h2>
        <p className="text-center text-gray-600 mb-12">Handpicked premium parts</p>
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="pb-12"
          >
            {products.map((p) => (
              <SwiperSlide key={p.id}>
                <ProductCard product={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="text-center mt-12">
          <a href="/products" className="bg-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}
