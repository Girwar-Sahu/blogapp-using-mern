import React from "react";

function About() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div className="">
          <h1 className="text-3xl font-semibold text-center my-7">
            About Girwar's Blog
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              quas quam atque debitis et quia quisquam alias consequatur
              pariatur vel similique velit sapiente, quae sit non magnam
              perferendis omnis nulla.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur tempora reiciendis odio suscipit impedit nemo, dolores
              mollitia et incidunt cupiditate facere aliquid autem hic nostrum
              dolorem quaerat inventore voluptate voluptatibus?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              maxime rem non voluptatem magni accusamus aliquid architecto,
              corrupti expedita voluptatibus sed sint, asperiores officiis
              consequuntur modi, suscipit nisi quae sit!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
