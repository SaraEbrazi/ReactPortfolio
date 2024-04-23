import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const data = [
  {
    id: 1,
    title: "Accordion One",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum iste maxime, labore temporibus distinctio, in ut necessitatibus ex voluptas unde, consectetur dolorem debitis? Vel eius, sed ex inventore consequatur nemo!",
  },
  {
    id: 2,
    title: "Accordion Two",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem nihil explicabo minus cupiditate ut libero amet quidem rerum eum! Voluptatem magnam qui nulla, rerum libero vero assumenda minima labore nisi!",
  },
  {
    id: 3,
    title: "Accordion Three",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem nihil explicabo minus cupiditate ut libero amet quidem rerum eum! Voluptatem magnam qui nulla, rerum libero vero assumenda minima labore nisi!",
  },
];
function Accordions() {
  const [open, setOpen] = useState(null);

  const handleOpen = (id) => {
    setOpen(id === open ? null : id);
  };

  return (
    <div className="accordion">
      {data.map((item) => (
        <AccordionItem
          id={item.id}
          title={item.title}
          key={item.id}
          onOpen={handleOpen}
          open={open}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam
            odio omnis distinctio, qui totam iste ut, architecto ducimus hic
            repellendus doloribus, impedit recusandae error sed commodi quidem
            facilis laboriosam! Voluptatibus.
          </p>
          <ul>
            <li>One</li>
            <li>Two</li>
          </ul>
        </AccordionItem>
      ))}
      <AccordionItem
        id={4}
        title="Another Accordion"
        onOpen={handleOpen}
        open={open}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut explicabo
          nam similique? Obcaecati numquam voluptatibus, fuga omnis doloremque
          quibusdam perspiciatis amet dignissimos ullam asperiores rem magnam
          similique laborum, recusandae magni.
        </p>
        <ul>
          <li>One</li>
          <li>Two</li>
        </ul>
      </AccordionItem>
    </div>
  );
}

export default Accordions;

function AccordionItem({ id, title, onOpen, open, children }) {
  const isOpen = id === open;

  return (
    <div className={`accordion-item ${isOpen ? "accordion__expanded" : "  "}`}>
      <div
        className="accordion-item__header"
        onClick={() => onOpen(id)}
      >
        <div>{title}</div>

        <ChevronDownIcon
          className="accordion-item__chevron"
          // style={{
          //   width: "1.2rem",
          //   transition: "all 0.2s ease-out",
          //   rotate: isOpen ? "180deg" : "0deg",
          //   // transformOrigin: "top"
          // }}
        />
        {/* {item.title} */}
      </div>
      <div className="accordion-item__content">{children}</div>
    </div>
  );
}
