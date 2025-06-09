"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const storyTemplates = [
  {
    id: 1,
    title: "The Rocket Repair Team",
    text: `{childName} tapped on the blinking light. &apos;Uh-oh, the rocket is broken!&apos;\nBut {parentName} smiled. &apos;We can fix it together, Engineer!&apos;\nWith tools in hand and imagination in gear, they tightened bolts, patched wires, and cheered as the engine roared to life.\n&apos;We did it!&apos; {childName} shouted, launching toward the stars.\n{parentName} whispered, &apos;There&apos;s nothing you can&apos;t solve when we work as a team.&apos;`
  },
  {
    id: 2,
    title: "The Dinosaur Discovery",
    text: `{childName} brushed away dirt from the backyard. &apos;Look!&apos; A giant bone!\n&apos;You&apos;ve discovered a new dinosaur!&apos; {parentName} gasped.\nThey built a museum in the garage, drew pictures, and named it the {childName}saurus.\nVisitors (aka stuffed animals) came from far and wide.\n&apos;When you stay curious,&apos; {parentName} said, &apos;the world becomes your playground.&apos;`
  },
  {
    id: 3,
    title: "The Sky Painter",
    text: `Every evening, {childName} and {parentName} watched the sky change colors.\nOne day, {childName} asked, &apos;Who paints the sunset?&apos;\n&apos;Maybe… you do,&apos; {parentName} smiled.\nThey mixed cloud whites, lemon yellows, and peachy oranges with their imagination brushes.\nThe whole sky lit up.\n&apos;When you dream big, you color the world,&apos; {parentName} whispered.`
  },
  {
    id: 4,
    title: "The Kindness Parade",
    text: `{childName} wore a cape made of hearts.\n&apos;What&apos;s your superpower?&apos; {parentName} asked.\n&apos;Kindness!&apos;\nThey marched down the hall, giving high-fives, hugs, and happy notes to every toy.\nEven grumpy Mr. Bear smiled.\n&apos;Being kind makes the world feel lighter,&apos; said {parentName}.\n&apos;And you, my little hero, are a light.&apos;`
  },
  {
    id: 5,
    title: "Captain of the Sea",
    text: `The living room became an ocean, and {childName} was captain of the couch-boat.\n&apos;Storm ahead!&apos;\n{parentName} helped steer with a broomstick and a mop.\nTogether, they navigated sea dragons and waves of pillows.\n&apos;You&apos;re brave, even when you&apos;re scared,&apos; {parentName} said.\n&apos;That&apos;s what true captains do.&apos;`
  },
  {
    id: 6,
    title: "The Quiet Rescue",
    text: `{childName} found a squirrel in the yard, shivering in the cold.\n{parentName} brought a towel and some berries.\nThey made a tiny bed in a shoebox and kept watch.\nThe squirrel wiggled its tail and nuzzled {childName} goodbye.\n&apos;You helped because your heart is big,&apos; {parentName} said.\n&apos;That&apos;s what makes you strong.&apos;`
  },
  {
    id: 7,
    title: "The Starlight Wish",
    text: `It was a big, quiet night.\n{childName} and {parentName} sat outside, counting stars.\n&apos;I don&apos;t know what I want to be yet,&apos; {childName} said.\n&apos;That&apos;s okay,&apos; said {parentName}, &apos;just wish for wonder.&apos;\nThey closed their eyes and let the starlight land gently on their cheeks.\n&apos;You can be anything,&apos; {parentName} said. &apos;And I&apos;ll be right here.&apos;`
  },
  {
    id: 8,
    title: "The Loud Idea",
    text: `{childName} had a BIG idea — but her voice was small.\n&apos;I think you should share it,&apos; {parentName} encouraged.\n{childName} practiced in the mirror. Then whispered it. Then SHOUTED it.\nIt echoed down the hallway.\n&apos;Wow!&apos; said {parentName}, &apos;Big voices come from brave hearts.&apos;`
  },
  {
    id: 9,
    title: "The Time Machine",
    text: `{childName} built a time machine out of a cardboard box and glitter glue.\nThey traveled to ancient Egypt, the moon, and even tomorrow&apos;s breakfast.\n&apos;Time is funny,&apos; said {parentName}, joining with a crown of cereal.\n&apos;But every moment with you is the best one yet.&apos;`
  },
  {
    id: 10,
    title: "The Great Messy Masterpiece",
    text: `{childName} wanted to paint the whole world — starting with the kitchen table.\nPaint spilled, brushes flew, and giggles echoed.\n{parentName} didn&apos;t mind the mess.\n&apos;Creativity is beautiful chaos,&apos; they said, lifting {childName} up for a hug.\n&apos;And you&apos;re the most colorful part of my life.&apos;`
  },
];

export default function Stories() {
  const [childName, setChildName] = useState("");
  const [childAvatar, setChildAvatar] = useState("");
  const router = useRouter();

  useEffect(() => {
    setChildName(sessionStorage.getItem("childName") || "your child");
    setChildAvatar(sessionStorage.getItem("childAvatar") || "");
  }, []);

  function handleSelect(storyId: number) {
    sessionStorage.setItem("selectedStoryId", String(storyId));
    router.push("/customize");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-peach-100 via-mint-100 to-sky-100 font-nunito text-gray-800 p-6">
      <div className="max-w-2xl w-full flex flex-col items-center gap-6 bg-white/80 rounded-3xl shadow-xl p-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{childAvatar}</span>
          <h2 className="text-2xl font-bold">Pick a story for {childName}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {storyTemplates.map(story => (
            <button
              key={story.id}
              onClick={() => handleSelect(story.id)}
              className="rounded-2xl bg-mint-100 hover:bg-peach-100 border-2 border-peach-100 hover:border-peach-300 p-4 text-lg font-semibold shadow transition text-left flex flex-col gap-2"
            >
              <span>{story.title}</span>
              <span className="text-xs text-gray-500">~100-150 words</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 