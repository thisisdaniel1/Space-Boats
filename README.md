# Space-Boats
github: https://github.com/thisisdaniel1/Space-Boats

A game where you play as captain to a ship of your own design and take it to battle an enemy ship.

Designing a ship mandates that you balance your credit spending with the available space on your ship (6 slots), and forces you to consider all the upgrades or hardpoints based on their effectiveness against hull or shields.

As for the battle, each ship (yours and the enemy) is stored as a single state object with each hardpoint and attribute a small part in it. Using those two states, the app prints out the ships opposite one another with a combat log in between. 

At the end of the screen is an list of actions for the player to take. Each action takes a certain amount of power, with the power coming from the number and quality of the generator(s), and represents all of that hardpoint being used. So in other words, pressing the fire laser button will fire all the lasers and consume up to that number of power relative to the number of lasers. You can also spend power to recharge shields, thereby bolstering your defense and creating a buffer for the ship's hull which cannot be repaired.

HOW IT WORKS

It's all pretty complex so I'll try to go slowly!
The Ship building screen or "DryDock" (yes, I realize its drydock but vscode was angry so I switched back to DryDock) all hinges on the 6 "Hardpoint" screens and the Store Menu.
Although technically 5 hardpoints, the sell function is counted as one too, whenever the player selects one of these hardpoints it brings them to the hardpoint specific screen.

This is because I could not think of a way to create my own case options in the boat dispatch. In other words, I could not load certain keywords (hardpoint names like laser) as types which could then be used to create custom cases for that dispatch. Therefore I was restricted to having SPECIFC TYPES for my dispatches which could only refer to SPECIFIC CASES. I hope it only gets easier in the future because I'm already tired of it. 

Also the store stores a lot of extra information upon purchase, like number of lasers or image path, which make assigning hardpoints actually possible!
And quickly for selling, it's very similar to buying except adding back the cost and reversing those hidden counters like the number of lasers.

I hope the ship layout is fairly self explanatory. You select a hardpoint, you select a square, you buy and assign that hardpoint to the square. Also the squares are the sections of the ship.
If you're wondering, imagine your ship is a massive cargo container or a weird Borg Rectangle ship.

Once you've spent enough credits (> 800) you can progress forward and fight your only opponent, the Inner Galactic Cruiser (ISC) Despot!

As the evil Despot, it will strike the first blow and then it'll be your turn.

The combat log is in the middle and will fill up as time goes on and your three "combat" actions are listed as "Fire All Lasers", "Fire All Missiles", and "Recharge Shields"
You're only able to fire all the weapons because your sailors have poor discipline and are trigger happy, and also it's late and I want to finish.

As for shields, you can recharge them as your ship takes hits. Shields are your first line of defense and have to be knocked out before hull damage can be taken. And once hull damage has been sustained, there's no repairing it.

All these actions consume power which are generated from those "lightning bolt" generators so you have to determine which actions are more important and allocate power accordingly.

Once you're out of power or done all the actions you would like, you can end the turn. The enemy will then have their turn and this will go on until there's only one ship floating in space!

THINGS TO IMPROVE

We all have some things we can work on and here are some things that come to mind at the end.
1. All the bad or missing CSS. Includes bad text and object alignment.
2. Bad Modularity. This specifically refers to the six hardpoint screens. I did manage to keep all the boat specific variables in one big state (boatState), also see the states for the store and enemy ship. Also I'm quite proud of all the enums since I've used this many before. However, having to change 6 different screens for every change is very annoying and time consuming.
3. Lack of clear (or any) instructions. I hope all the images are self explanatory enough because I did not have the time for many instructions at all, although I do provide the calculations.
4. Lack of encompassing functions. I should have caught on to this earlier, but I could have declared and written functions that combined a lot of repetitive tasks and then later, only have to call that one function. I'm used to doing this with React (and JSX) and in the future will be making more use of this hack.
5. Could have used more secondary payloads. If you look closely, you can see a lot of types and dispatch calls which are activated on the same onPress. I could have combined some although this is purely preference. I was also scared that I would mess something up though since I did not have much time to test it out.
6. The Despot's total laser, missile, and shield values were pre-calculated by me and hardcoded. In a moment of weakness and this being 2 days ago, I committed the cardinal sin. I hope you can forgive me since I do calculate every other value in real time.
7. Oh and Despot isn't very smart...

Also I wrapped up at around 11:45 so no time for testing...