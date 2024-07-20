import clsx from "clsx";
import React, { useRef, useEffect, useState } from "react";
import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface PassThroughProps {
  className?: string;
}

interface SlotProps {
  containerClassName?: string;
  contentClassName?: string;
}

interface Slot {
  content?: React.ReactNode | null;
  slotProps?: SlotProps;
}

interface TopSlot extends Slot {
  inner?: PassThroughProps;
}

interface DrawerSlot extends Slot {
  shareContent?: boolean;
  rest?: string;
}

interface DrawerStateIconProps {
  content?: React.ReactNode | null;
  pt?: PassThroughProps;
}

interface TContainerLayoutSlots {
  icons?: {
    rightDrawerOpenIcon?: DrawerStateIconProps;
    leftDrawerOpenIcon?: DrawerStateIconProps;
  };
  breakpoints?: { first: Breakpoint; second: Breakpoint };
  top?: TopSlot;
  left?: Slot;
  right?: Slot;
  leftDrawer?: DrawerSlot;
  rightDrawer?: DrawerSlot;
  footer?: Slot;
  main?: {
    outer?: PassThroughProps;
    outerMost?: PassThroughProps;
    inner?: PassThroughProps;
    innerMost?: PassThroughProps;
  };
}

interface TContainerLayoutProps {
  className?: string;
  children?: React.ReactNode | null;
  slots: TContainerLayoutSlots;
}

export const TContainerLayout: React.FC<TContainerLayoutProps> = ({
  className,
  children,
  slots: {
    icons,
    main,
    top,
    left,
    right,
    footer,
    leftDrawer,
    rightDrawer,
    breakpoints,
  },
}) => {
  const theme = useTheme();
  const isLgOrLarger = useMediaQuery(
    theme.breakpoints.up(breakpoints?.first || "lg")
  );
  const isMdOrLarger = useMediaQuery(
    theme.breakpoints.up(breakpoints?.second || "md")
  );
  const [topBarHeight, setTopBarHeight] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  const leftDrawerRef = useRef<HTMLDivElement>(null);
  const leftDrawerWrapperRef = useRef<HTMLDivElement>(null);
  const leftDrawerTimeline = useRef<GSAPTimeline>(null);
  const rightDrawerRef = useRef<HTMLDivElement>(null);
  const rightDrawerWrapperRef = useRef<HTMLDivElement>(null);
  const rightDrawerTimeline = useRef<GSAPTimeline>(null);

  const toggleLeftDrawerTimeline = () => {
    leftDrawerTimeline.current?.reversed(
      !leftDrawerTimeline.current.reversed()
    );
  };

  const toggleRightDrawerTimeline = () => {
    rightDrawerTimeline.current?.reversed(
      !rightDrawerTimeline.current.reversed()
    );
  };

  useGSAP(() => {
    leftDrawerTimeline.current = gsap
      .timeline()
      .to(
        leftDrawerWrapperRef.current,
        { left: "0%", duration: 0.4, ease: "power1.in" },
        "<"
      )
      .to(leftDrawerRef.current, {
        left: leftDrawer?.rest || "0%",
        duration: 0.4,
        ease: "power3.out",
      })
      .reverse();

    rightDrawerTimeline.current = gsap
      .timeline()
      .to(
        rightDrawerWrapperRef.current,
        { right: "0%", duration: 0.4, ease: "power1.in" },
        "<"
      )
      .to(rightDrawerRef.current, {
        right: rightDrawer?.rest || "0%",
        duration: 0.4,
        ease: "power3.out",
      })
      .reverse();
  });

  useEffect(() => {
    const handleResize = () => {
      if (topRef.current) {
        const { height } = topRef.current.getBoundingClientRect();
        setTopBarHeight(height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={clsx(`${className} min-h-screen flex flex-col`)}>
      {/* Top Layout Bar */}
      <div
        ref={topRef}
        className={clsx(`${top?.slotProps?.containerClassName} sticky top-0 z-50`)}
      >
        <div className={clsx(`flex ${top?.slotProps?.contentClassName}`)}>
          <button
            style={{ display: isLgOrLarger ? "none" : "block" }}
            onClick={toggleLeftDrawerTimeline}
            className={clsx(`${icons?.leftDrawerOpenIcon?.pt?.className}`)}
          >
            {icons?.leftDrawerOpenIcon?.content}
          </button>
          <div className={clsx(`${top?.inner?.className} flex-grow`)}>
            {top?.content}
          </div>
          <button
            style={{ display: isMdOrLarger ? "none" : "block" }}
            onClick={toggleRightDrawerTimeline}
            className={clsx(
              `${icons?.rightDrawerOpenIcon?.pt?.className} lg:hidden`
            )}
          >
            {icons?.rightDrawerOpenIcon?.content}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={clsx(`${main?.outerMost?.className} flex flex-grow`)}>
        {/* Container */}
        <div
          className={clsx(
            `${main?.outer?.className} flex-grow flex container mx-auto`
          )}
        >
          {/* Left Drawer */}
          <div
            onClick={toggleLeftDrawerTimeline}
            ref={leftDrawerWrapperRef}
            style={{
              position: "fixed",
              zIndex: isLgOrLarger ? -1000 : 1000,
              left: "100%",
            }}
            className={clsx(
              `${leftDrawer?.slotProps?.containerClassName} flex inset-y-0 right-0`
            )}
          >
            <div
              ref={leftDrawerRef}
              style={{ left: "100%" }}
              className={clsx(
                `inset-y-2 ${leftDrawer?.slotProps?.contentClassName} absolute overflow-hidden`
              )}
            >
              {leftDrawer?.shareContent ? left?.content : leftDrawer?.content}
            </div>
          </div>

          {/* Left */}
          <div
            style={{ display: isLgOrLarger ? "block" : "none" }}
            className={clsx(`flex-grow ${left?.slotProps?.containerClassName}`)}
          >
            <div
              className={clsx(`${left?.slotProps?.contentClassName}`)}
              style={{ position: "sticky", top: topBarHeight }}
            >
              {left?.content}
            </div>
          </div>

          {/* Main */}
          <div className={clsx(`${main?.inner?.className} flex-grow`)}>
            <div className={clsx(`${main?.innerMost?.className}`)}>
              {children}
            </div>
          </div>

          {/* Right Drawer */}
          <div
            onClick={toggleRightDrawerTimeline}
            ref={rightDrawerWrapperRef}
            style={{
              position: "fixed",
              zIndex: isMdOrLarger ? -1000 : 1000,
              right: "100%",
            }}
            className={clsx(
              `${rightDrawer?.slotProps?.containerClassName} flex inset-y-0 left-0`
            )}
          >
            <div
              ref={rightDrawerRef}
              style={{ right: "100%" }}
              className={clsx(
                `inset-y-2 ${rightDrawer?.slotProps?.contentClassName} absolute overflow-hidden`
              )}
            >
              {rightDrawer?.shareContent
                ? right?.content
                : rightDrawer?.content}
            </div>
          </div>

          {/* Right */}
          <div
            style={{ display: isMdOrLarger ? "block" : "none" }}
            className={clsx(
              `flex-grow ${right?.slotProps?.containerClassName}`
            )}
          >
            <div
              className={clsx(`${right?.slotProps?.contentClassName}`)}
              style={{ position: "sticky", top: topBarHeight }}
            >
              {right?.content}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={clsx(`${footer?.slotProps?.containerClassName}`)}>
        <div className={clsx(`${footer?.slotProps?.contentClassName}`)}>
          {footer?.content}
        </div>
      </div>
    </div>
  );
};
