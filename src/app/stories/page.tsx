"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const storyTemplates = [
  {
    id: 1,
    title: "The Rocket Repair Team",
    text: `{childName} tapped on the blinking light. 'Uh-oh, the rocket is broken!'\nBut {parentName} smiled. 'We can fix it together, Engineer!'\nWith tools in hand and imagination in gear, they tightened bolts, patched wires, and cheered as the engine roared to life.\n'We did it!' {childName} shouted, launching toward the stars.\n{parentName} whispered, 'There's nothing you can't solve when we work as a team.'`
  },
  {
    id: 2,
    title: "The Dinosaur Discovery",
    text: `{childName} brushed away dirt from the backyard. 'Look!' A giant bone!\n'You've discovered a new dinosaur!' {parentName} gasped.\nThey built a museum in the garage, drew pictures, and named it the {childName}saurus.\nVisitors (aka stuffed animals) came from far and wide.\n'When you stay curious,' {parentName} said, 'the world becomes your playground.'`
  },
  {
    id: 3,
    title: "The Sky Painter",
    text: `Every evening, {childName} and {parentName} watched the sky change colors.\nOne day, {childName} asked, 'Who paints the sunset?'\n'Maybe… you do,' {parentName} smiled.\nThey mixed cloud whites, lemon yellows, and peachy oranges with their imagination brushes.\nThe whole sky lit up.\n'When you dream big, you color the world,' {parentName} whispered.`
  },
  {
    id: 4,
    title: "The Kindness Parade",
    text: `{childName} wore a cape made of hearts.\n'What's your superpower?' {parentName} asked.\n'Kindness!'\nThey marched down the hall, giving high-fives, hugs, and happy notes to every toy.\nEven grumpy Mr. Bear smiled.\n'Being kind makes the world feel lighter,' said {parentName}.\n'And you, my little hero, are a light.'`
  },
  {
    id: 5,
    title: "Captain of the Sea",
    text: `The living room became an ocean, and {childName} was captain of the couch-boat.\n'Storm ahead!'\n{parentName} helped steer with a broomstick and a mop.\nTogether, they navigated sea dragons and waves of pillows.\n'You're brave, even when you're scared,' {parentName} said.\n'That's what true captains do.'`
  },
  {
    id: 6,
    title: "The Quiet Rescue",
    text: `{childName} found a squirrel in the yard, shivering in the cold.\n{parentName} brought a towel and some berries.\nThey made a tiny bed in a shoebox and kept watch.\nThe squirrel wiggled its tail and nuzzled {childName} goodbye.\n'You helped because your heart is big,' {parentName} said.\n'That's what makes you strong.'`
  },
  {
    id: 7,
    title: "The Starlight Wish",
    text: `It was a big, quiet night.\n{childName} and {parentName} sat outside, counting stars.\n'I don't know what I want to be yet,' {childName} said.\n'That's okay,' said {parentName}, 'just wish for wonder.'\nThey closed their eyes and let the starlight land gently on their cheeks.\n'You can be anything,' {parentName} said. 'And I'll be right here.'`
  },
  {
    id: 8,
    title: "The Loud Idea",
    text: `{childName} had a BIG idea — but her voice was small.\n'I think you should share it,' {parentName} encouraged.\n{childName} practiced in the mirror. Then whispered it. Then SHOUTED it.\nIt echoed down the hallway.\n'Wow!' said {parentName}, 'Big voices come from brave hearts.'`
  },
  {
    id: 9,
    title: "The Time Machine",
    text: `{childName} built a time machine out of a cardboard box and glitter glue.\nThey traveled to ancient Egypt, the moon, and even tomorrow's breakfast.\n'Time is funny,' said {parentName}, joining with a crown of cereal.\n'But every moment with you is the best one yet.'`
  },
  {
    id: 10,
    title: "The Great Messy Masterpiece",
    text: `{childName} wanted to paint the whole world — starting with the kitchen table.\nPaint spilled, brushes flew, and giggles echoed.\n{parentName} didn't mind the mess.\n'Creativity is beautiful chaos,' they said, lifting {childName} up for a hug.\n'And you're the most colorful part of my life.'`
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