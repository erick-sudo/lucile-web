import { useState } from "react";
import { randint } from "../lib/utils";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";

// { title: "Animi deleniti vel" }

interface MenuItem {
  title: string;
  sub?: MenuItem[];
}

const randomize: (depth?: number, root?: MenuItem) => MenuItem = (
  depth = 5,
  root = { title: "root" }
) => {
  const size = randint(0, 5);

  if (size > 1 && depth > 0) {
    const newItem: MenuItem = {
      title: "Animi deleniti vel",
    };
    root.sub = new Array(size).fill(0).map(() => randomize(depth - 1, newItem));
  }

  return root;
};

export function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem>({ title: "root" });

  return (
    <div>
      <div className="p-2 gap-2">
        <button
          onClick={() => {
            setMenuItems(randomize(5));
          }}
        >
          Generate
        </button>
        <Menuitem menuItem={menuItems} />
        <WalkTree />
      </div>
    </div>
  );
}

function Menuitem({
  menuItem,
  depth = 0,
}: {
  menuItem: MenuItem;
  depth?: number;
}) {
  return (
    <div>
      {menuItem.sub && menuItem.sub.length > 0 ? (
        <Accordion
          sx={{ p: 0, background: "transparent", boxShadow: "none" }}
          square
          className=""
        >
          <AccordionSummary expandIcon={<ExpandMore />} sx={{ p: 0 }}>
            <div className="px-4 py-1 w-full">
              {menuItem.title}
            </div>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0, pl: 4 }} className="">
            {menuItem.sub.map((item, index) => (
              <Menuitem menuItem={item} key={index} depth={depth + 1} />
            ))}
          </AccordionDetails>
        </Accordion>
      ) : (
        <div className="px-4 py-1 w-full">{menuItem.title}</div>
      )}
    </div>
  );
}

function WalkTree({}) {
  return <div className={``}></div>;
}

function AccordionTree() {
  return <div></div>;
}
