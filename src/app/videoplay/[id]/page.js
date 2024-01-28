"use client";

import { useParams } from "next/navigation";

export default function videoplay() {
  const { id } = useParams();
  return (
    <div className=" flex m-auto w-4/6 h-[36rem]">
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1`}
        allowFullScreen="true"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
}
