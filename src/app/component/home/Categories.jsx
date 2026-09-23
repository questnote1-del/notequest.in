import Image from "next/image";
import Link from "next/link";
import { categories } from "../../data/homeData";

export default function Categories() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-sm font-medium">Explore</p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Browse by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              href={`/category/${category.name
                .toLowerCase()
                .replaceAll(" ", "-")}`}
              key={category.id}
              className="group border rounded-2xl overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm">
                  {category.description}
                </p>

                <p className="mt-4 text-sm font-medium">
                  {category.count}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}