"use client";
import { FeedItem } from "@/app/lib/store/feedSlice/feedSlice";
import React, { useRef, useState, useEffect} from "react";

interface SwipeCardProps {
  userData?: FeedItem;
  onSwipe?: (status: "ignored" | "interested" | "maybe") => void;
}

const SwipeCard: React.FC<SwipeCardProps> = (props: SwipeCardProps) => {
  const { userData, onSwipe } = props;
  const cardRef = useRef<HTMLDivElement | null>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = useState<
    "ignored" | "interested" | "up" | "down" | null
  >(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);

    // Remove transition for drag start
    if (cardRef.current) {
      cardRef.current.style.transition = "none";
    }

    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !cardRef.current) return;

    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setOffset({ x: dx, y: dy });

    if (Math.abs(dx) > Math.abs(dy)) {
      setSwipeDirection(dx > 0 ? "interested" : "ignored");
    } else {
      setSwipeDirection(dy > 0 ? "down" : "up");
    }
    cardRef.current.style.transform = `translate(${dx}px, ${dy}px) rotate(${
      dx * 0.05
    }deg)`;
  };

  const handleMouseUp = () => {
    if (!isDragging || !cardRef.current) return;
    setIsDragging(false);
    document.body.style.userSelect = "auto";

    const dx = offset.x;
    const dy = offset.y;
    const threshold = 120;

    let status: "ignored" | "interested" | "maybe" | null = null;
    let outX = 0;
    let outY = 0;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
      status = dx > 0 ? "interested" : "ignored";
      outX = dx > 0 ? 1000 : -1000;
    } else {
      status = "maybe";
      outY = dy > 0 ? 1000 : -1000;
    }
    if (status) {
      onSwipe?.(status);

      if (cardRef.current) {
        cardRef.current.style.transition = "transform 0.3s ease";
        cardRef.current.style.transform = `translate(${outX}px, ${outY}px) rotate(${
          dx * 0.1
        }deg)`;

        setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.style.display = "none";
          }
        }, 300);
      }
    } else {
      if (cardRef.current) {
        cardRef.current.style.transition = "transform 0.3s ease";
        cardRef.current.style.transform = `translate(0px, 0px) rotate(0deg)`;
      }
    }
    setOffset({ x: 0, y: 0 });
    setSwipeDirection(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        width: 300,
        height: 400,
        borderRadius: 16,
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
        overflow: "hidden",
        cursor: isDragging ? "grabbing" : "grab",
        background: "#fff",
        transition: "transform 0.3s ease",
        userSelect: "none",
      }}
    >
      {swipeDirection && (
        <div
          style={{
            position: "absolute",
            top:
              swipeDirection === "up"
                ? 20
                : swipeDirection === "down"
                ? "auto"
                : 20,
            bottom: swipeDirection === "down" ? 20 : "auto",
            left:
              swipeDirection === "ignored"
                ? 20
                : swipeDirection === "up" || swipeDirection === "down"
                ? "50%"
                : "auto",
            right: swipeDirection === "interested" ? 20 : "auto",
            transform:
              swipeDirection === "up" || swipeDirection === "down"
                ? "translateX(-50%)"
                : "none",
            padding: "8px 16px",
            backgroundColor:
              swipeDirection === "ignored"
                ? "#f87171"
                : swipeDirection === "interested"
                ? "#34d399"
                : "#facc15",
            color: "#000",
            fontWeight: "bold",
            fontSize: 18,
            borderRadius: 8,
            opacity: Math.min(
              Math.max(Math.abs(offset.x), Math.abs(offset.y)) / 100,
              1
            ),
            transition: "opacity 0.2s ease",
            zIndex: 10,
          }}
        >
          {swipeDirection === "ignored"
            ? "Ignored"
            : swipeDirection === "interested"
            ? "Interested"
            : "Maybe Later"}
        </div>
      )}

      <img
        src={userData?.photoUrl}
        alt={userData?.firstname}
        style={{ width: "100%", height: "75%", objectFit: "cover" }}
      />
      <div className="card-body bg-base-300">
        <h2 className="card-title">
          {userData?.firstname + " " + userData?.lastname}
        </h2>
        {userData?.age && userData?.gender && (
          <p className="mb-0 pb-0">{userData?.gender + " " + userData?.age}</p>
        )}
      </div>
    </div>
  );
};

export default SwipeCard;
