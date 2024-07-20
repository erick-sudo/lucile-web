import { SyntheticEvent, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function CollapseBox() {
  return <ChevronDownIcon className="" height={14} />;
}

function ExpandBox() {
  return <ChevronRightIcon className="" height={14} />;
}

export const TREE_ITEM_STYLES = {
  treeItem: {
    borderRadius: "0.25rem",
    "&:hover": {
      backgroundColor: "rgb(147 51 234 / 0.1)",
      color: "rgb(107 33 168)",
    },
    "& .MuiTreeItem-label": {
      display: "flex",
      alignItems: "center",
      gap: 1,
      p: 0.5,
    },
    "& .MuiTreeItem-content": {
      flexDirection: "row-reverse",
    },
    "& .Mui-expanded": {
      border: "solid 1px rgb(107 33 168 / 0.5)",
      color: "rgb(107 33 168)",
    },
    "& .Mui-focused": {
      backgroundColor: "transparent",
    },
  },
  treeItemsContainer: {
    "& .MuiTreeItem-content": {
      flexDirection: "row-reverse",
    },
    "& .MuiTreeItem-label": {
      display: "flex",
      alignItems: "center",
      gap: 1,
      p: 0.5,
    },
    "& .Mui-expanded": {
      border: "solid 1px rgb(107 33 168 / 0.5)",
      color: "rgb(107 33 168)",
    },
    "& .Mui-focused": {
      backgroundColor: "transparent",
    },
  },
};

export const TreeView: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleExpandedItemsChange = (
    _event: SyntheticEvent<Element, Event>,
    itemIds: string[]
  ) => {
    setExpandedItems(itemIds);
  };

  return (
    <SimpleTreeView
      slots={{ expandIcon: ExpandBox, collapseIcon: CollapseBox }}
      expandedItems={expandedItems}
      onExpandedItemsChange={handleExpandedItemsChange}
      disableSelection
      className="grid gap-2 font-serif"
    >
      {children}
    </SimpleTreeView>
  );
};
