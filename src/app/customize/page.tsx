"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const storyTemplates = [
  {
    id: 1,
    title: "The Rocket Repair Team",
    text: `{childName} tapped on the blinking light. 'Uh-oh, the rocket is broken!'
But {parentName} smiled. 'We can fix it together, Engineer!'
With tools in hand and imagination in gear, they tightened bolts, patched wires, and cheered as the engine roared to life.
'We did it!' {childName} shouted, launching toward the stars.
{parentName} whispered, 'There's nothing you can't solve when we work as a team.'`
  },
  {
    id: 2,
    title: "The Dinosaur Discovery",
    text: `{childName} brushed away dirt from the backyard. 'Look!' A giant bone!
'You've discovered a new dinosaur!' {parentName} gasped.
They built a museum in the garage, drew pictures, and named it the {childName}saurus.
Visitors (aka stuffed animals) came from far and wide.
'When you stay curious,' {parentName} said, 'the world becomes your playground.'`
  },
  {
    id: 3,
    title: "The Sky Painter",
    text: `Every evening, {childName} and {parentName} watched the sky change colors.
One day, {childName} asked, 'Who paints the sunset?'
'Maybe… you do,' {parentName} smiled.
They mixed cloud whites, lemon yellows, and peachy oranges with their imagination brushes.
The whole sky lit up.
'When you dream big, you color the world,' {parentName} whispered.`
  },
  {
    id: 4,
    title: "The Kindness Parade",
    text: `{childName} wore a cape made of hearts.
'What's your superpower?' {parentName} asked.
'Kindness!'
They marched down the hall, giving high-fives, hugs, and happy notes to every toy.
Even grumpy Mr. Bear smiled.
'Being kind makes the world feel lighter,' said {parentName}.
'And you, my little hero, are a light.'`
  },
  {
    id: 5,
    title: "Captain of the Sea",
    text: `The living room became an ocean, and {childName} was captain of the couch-boat.
'Storm ahead!'
{parentName} helped steer with a broomstick and a mop.
Together, they navigated sea dragons and waves of pillows.
'You're brave, even when you're scared,' {parentName} said.
'That's what true captains do.'`
  },
  {
    id: 6,
    title: "The Quiet Rescue",
    text: `{childName} found a squirrel in the yard, shivering in the cold.
{parentName} brought a towel and some berries.
They made a tiny bed in a shoebox and kept watch.
The squirrel wiggled its tail and nuzzled {childName} goodbye.
'You helped because your heart is big,' {parentName} said.
'That's what makes you strong.'`
  },
  {
    id: 7,
    title: "The Starlight Wish",
    text: `It was a big, quiet night.
{childName} and {parentName} sat outside, counting stars.
'I don't know what I want to be yet,' {childName} said.
'That's okay,' said {parentName}, 'just wish for wonder.'
They closed their eyes and let the starlight land gently on their cheeks.
'You can be anything,' {parentName} said. 'And I'll be right here.'`
  },
  {
    id: 8,
    title: "The Loud Idea",
    text: `{childName} had a BIG idea — but her voice was small.
'I think you should share it,' {parentName} encouraged.
{childName} practiced in the mirror. Then whispered it. Then SHOUTED it.
It echoed down the hallway.
'Wow!' said {parentName}, 'Big voices come from brave hearts.'`
  },
  {
    id: 9,
    title: "The Time Machine",
    text: `{childName} built a time machine out of a cardboard box and glitter glue.
They traveled to ancient Egypt, the moon, and even tomorrow's breakfast.
'Time is funny,' said {parentName}, joining with a crown of cereal.
'But every moment with you is the best one yet.'`
  },
  {
    id: 10,
    title: "The Great Messy Masterpiece",
    text: `{childName} wanted to paint the whole world — starting with the kitchen table.
Paint spilled, brushes flew, and giggles echoed.
{parentName} didn't mind the mess.
'Creativity is beautiful chaos,' they said, lifting {childName} up for a hug.
'And you're the most colorful part of my life.'`
  },
];

function fillStoryPlaceholders(story: string, childName: string, parentName: string) {
  return story.replaceAll("{childName}", childName).replaceAll("{parentName}", parentName);
}

export default function Customize() {
  const [storyText, setStoryText] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [selectedStories, setSelectedStories] = useState<string[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const child = sessionStorage.getItem("childName") || "";
    const parent = sessionStorage.getItem("parentName") || "";
    const stories = JSON.parse(sessionStorage.getItem("selectedStories") || "[]");
    console.log("Selected Stories:", stories);
    console.log("Current Story Index:", currentStoryIndex);
    setSelectedStories(stories);
    
    if (stories.length > 0) {
      console.log("Looking for story ID:", stories[currentStoryIndex]);
      console.log("Available stories:", storyTemplates.map(s => ({ id: s.id, title: s.title })));
      
      const story = storyTemplates.find(s => s.id === Number(stories[currentStoryIndex]));
      console.log("Found story:", story);
      
      if (story && child && parent) {
        setStoryTitle(story.title);
        const filledText = fillStoryPlaceholders(story.text, child, parent);
        setStoryText(filledText);
        console.log("Story Text:", filledText);
      } else {
        console.log("Missing data:", { story, child, parent });
      }
    }
  }, [currentStoryIndex]);

  function handleBack() {
    router.push("/stories");
  }

  function handleNextStory() {
    console.log("Current Story Index:", currentStoryIndex);
    if (currentStoryIndex < selectedStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      handleSubmit();
    }
  }

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    sessionStorage.setItem("finalStoryTitle", storyTitle);
    sessionStorage.setItem("finalStoryText", storyText);
    router.push("/storybook");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-peach-100 via-mint-100 to-sky-100 font-nunito text-gray-800 p-6">
      <form onSubmit={handleSubmit} className="max-w-xl w-full flex flex-col items-center gap-6 bg-white/80 rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Customize Your Story</h2>
        <h3 className="text-xl font-semibold text-center mb-2">{storyTitle}</h3>
        <textarea
          className="w-full h-56 p-4 rounded-xl border border-peach-300 focus:outline-none focus:ring-2 focus:ring-peach-400 text-lg bg-peach-100 resize-vertical"
          value={storyText}
          onChange={e => setStoryText(e.target.value)}
        />
        <div className="flex gap-4 w-full justify-between">
          <button type="button" onClick={handleBack} className="px-6 py-2 rounded-full bg-mint-100 hover:bg-peach-100 text-peach-400 font-semibold shadow transition">Back</button>
          <button type="button" onClick={handleNextStory} className="px-8 py-3 rounded-full bg-peach-300 hover:bg-peach-400 text-white font-semibold text-lg shadow transition">
            {currentStoryIndex < selectedStories.length - 1 ? "Next Story" : "Generate Storybook"}
          </button>
        </div>
      </form>
    </div>
  );
} 