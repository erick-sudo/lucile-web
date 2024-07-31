import "./App.css";
import FAQ from "./components/FAQ";
import { TContainerLayout } from "./ui/TContainerLayout";
import { Bars4Icon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Routes, Route } from "react-router-dom";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { TreeView } from "./ui/TreeView";
import { TreeItem } from "@mui/x-tree-view";
import { categories } from "./lib/categories";
import clsx from "clsx";
import { Footer } from "./components/Footer";
import { NavigationBar } from "./components/NavigationBar";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="bg-stone-100 px-2">
      <TContainerLayout
        slots={{
          icons: {
            leftDrawerOpenIcon: {
              content: <Bars4Icon height={24} />,
              pt: {
                className:
                  "p-1 rounded overflow-hidden ring-1 ring-inset ring-pink-800/30 bg-pink-100 text-pink-800 lucile-grad-hover hover:text-white duration-300",
              },
            },
            rightDrawerOpenIcon: {
              content: <EllipsisVerticalIcon height={20} />,
              pt: {
                className: "p-2 text-pink-800 duration-300",
              },
            },
          },
          top: {
            slotProps: {
              containerClassName: "bg-stone-100/80 backdrop-blur min-h-16",
              contentClassName: "container mx-auto items-center ",
            },
            inner: {
              className: "flex-grow",
            },
            content: (
              <div className="">
                <NavigationBar />
              </div>
            ),
          },
          left: {
            slotProps: {
              containerClassName: "max-w-xs",
              contentClassName: "p-2",
            },
            content: (
              <div className="flex justify-end">
                <div className="grid gap-2 max-w-xs flex-grow">
                  <TreeView>
                    {categories.map((navItem, index) =>
                      navItem.sub ? (
                        <TreeItem
                          key={index}
                          itemId={`${index}#${navItem.title}`}
                          className={clsx("", {
                            "rounded whitespace-nowrap": /[.]*/.test(
                              navItem.title
                            ),
                          })}
                          label={
                            <span className="text-sm">
                              {/* {navItem.icon} */}
                              {navItem.title}
                            </span>
                          }
                          // sx={{
                          //   ...TREE_ITEM_STYLES.treeItemsContainer,
                          //   p: 1,
                          // }}
                        >
                          {navItem.sub.map((subMenuItem, idx) => (
                            <TreeItem
                              key={idx}
                              itemId={`${index}#${idx}#${subMenuItem.title}`}
                              className={clsx("", {
                                "": /[.]*/.test(subMenuItem.title),
                              })}
                              label={
                                <>
                                  {/* {subMenuItem.icon} */}
                                  <span className="whitespace-nowrap text-sm">
                                    {subMenuItem.title}
                                  </span>
                                </>
                              }
                              // sx={{ ...TREE_ITEM_STYLES.treeItem, margin: 1 }}
                            />
                          ))}
                        </TreeItem>
                      ) : (
                        <TreeItem
                          key={index}
                          itemId={`${index}#${navItem.title}`}
                          // onClick={() => navigate(navItem.path)}
                          // sx={{ ...TREE_ITEM_STYLES.treeItem }}
                          className={clsx("whitespace-nowrap", {
                            "": /[.]*/.test(navItem.title),
                          })}
                          label={
                            <>
                              {/* <span>{navItem.icon}</span> */}
                              <span className="text-sm">{navItem.title}</span>
                            </>
                          }
                        />
                      )
                    )}
                  </TreeView>
                </div>
              </div>
            ),
          },
          leftDrawer: {
            shareContent: true,
            slotProps: {
              containerClassName: "bg-stone-800/10",
              contentClassName:
                "border border-pink-800/40 bg-stone-200 top-2 bottom-2 rounded-xl shadow-sm shadow-pink-950 p-2",
            },
            rest: "0.5rem",
          },
          right: {
            slotProps: {
              containerClassName: "max-w-xs",
              contentClassName: "p-2",
            },
            content: (
              <div className="">
                <div className="grid gap-2 max-w-xs">
                  <h3 className="px-4 py-2 text-stone-950 text-sm">
                    On this page
                  </h3>
                  {["Home", "FAQ", "Notifications", "Profile"].map(
                    (p, index) => (
                      <div key={index} className="px-4 py-1">
                        {p}
                      </div>
                    )
                  )}
                </div>
              </div>
            ),
          },
          rightDrawer: {
            shareContent: true,
            slotProps: {
              containerClassName: "bg-stone-800/10",
              contentClassName:
                "border border-pink-800/40 bg-stone-200 top-2 bottom-2 rounded-xl shadow-sm shadow-pink-950 p-2",
            },
            rest: "0.5rem",
          },
          main: {
            inner: {
              className: "md:max-w-xl lg:max-w-2xl xl:max-w-4xl",
            },
            outer: {
              className: "",
            },
            outerMost: {
              className: "",
            },
            innerMost: {
              className: "grid gap-4",
            },
          },
          footer: {
            content: (
              <div className="grid gap-4">
                <div></div>
                <Footer />
              </div>
            ),
            slotProps: {
              containerClassName: "",
              contentClassName: "container mx-auto",
            },
          },
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </TContainerLayout>
    </div>
  );
}

export default App;
