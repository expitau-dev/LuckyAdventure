// START OF SCRIPT
commands = {
	"clr": (args) => {
		t.clear();
	},
	"h": (args) => {
		print(`Commands:

move (north|east|south|west|up|down)
look
look [item]
get [item]
use [item]
meow at [item]
inv
help
clear`);
	},
	"kill": (args) => {
		print(`Chichien is too nice to do that, but apparently you aren't`);
	},
	"i": (args) => {
		displayInventory();
	},
	"l": (args) => {
		if (!args || !args[0]) {
			print(`You aren't entirely sure where you are`);
		} else if (args[0] == 'i') {
			displayInventory();
		}
	},
	"m": (args) => {
		if (!args || !args[0]) {
			print(`Where do you want to go?`);
		} else if (args[0] == 'n') {
			print(`You can't go that way`);
		} else if (args[0] == 'e') {
			print(`You can't go that way`);
		} else if (args[0] == 's') {
			print(`You can't go that way`);
		} else if (args[0] == 'w') {
			print(`You can't go that way`);
		} else if (args[0] == 'u') {
			print(`You can't go that way`);
		} else if (args[0] == 'd') {
			print(`You can't go that way`);
		}
	},
	"g": (args) => {
		if (!args || !args[0]) {
			print(`What do you want to get?`);
		} else if (args[0] == '.*') {
			print(`You can't get that. Chichien just has paws, I'm not sure what you expect`);
		}
	},
	"meow": (args) => {
		if (!args || !args[0]) {
			print(`What do you want to meow at?`);
		} else if (args[0] == '.*') {
			print(`It doesn't respond :(`);
		}
	},
	"u": (args) => {
		if (!args || !args[0]) {
			print(`What do you want to use?`);
		} else if (args[0] == 'bed') {
			print(`It's too uncomfortable`);
		} else if (args[0] == '.*') {
			print(`Chichien is confused and can't do that`);
		}
	},
	"give": (args) => {
		print(`You can't do that`);
	},
};



locations = {
	kitchen: {
		name: "kitchen",
		commands: {
			"l": (args) => {
				if (!args || !args[0]) {
					t.clear();
					print(`You're in the kitchen, it gets pretty loud here sometimes, but the sun is shining through the window and is very warm.
N: The dining room
S: There's a door leading outside
- The sun is shining onto the floor`);
				} else if (args[0] == 'sun') {
					print(`The sun looks very warm and inviting`);
				}
			},
			"u": (args) => {
				if (!args || !args[0]) {
				} else if (args[0] == 'sun') {
					print(`You sit in the sun. It's very warm and nice. Just as you start to relax, the dishwasher turns on and you freak out and run to the dining room.`);
					goTo("dining_room");
				}
			},
		},
		connections: {
			"(s|outside)": () => {
				if (variables["You have eaten food"] && variables["You have had a drink"] && variables["You are well rested"]) {
					print(`You are ready. You wander over and meow at baba until he lets you outside`);
					goTo("outside");
				}
				else {
					print(`You're not ready to go outside yet, you need to be well fed, have a drink, and rest first`);
				}
			},
			"(n|dining)": () => {
				print(`You go into the dining room`);
				goTo("dining_room");
			},
		},
	},
	outside: {
		name: "outside",
		commands: {
			"l": (args) => {
				if (!args || !args[0]) {
					t.clear();
					print(`It's a pretty nice day! Not cold enough to form the terrible wet white fluff, but not too hot that shade is required. You survey the landscape of infinite litterbox, and decide that the garden is an excellent spot.
N: You can go back inside
S: You can go on an adventure into the forest.
W: You can go around front
- There is a catnip plant growing in the garden`);
				} else if (args[0] == 'forest') {
					print(`The forest is fun to play in, you like chasing leaves`);
				} else if (args[0] == 'catnip') {
					print(`The plant smells good`);
				}
			},
			"g": (args) => {
				if (!args || !args[0]) {
				} else if (args[0] == 'catnip') {
					print(`The catnip is fantastic, it makes you happy. You begin to loose control, and you freak out. You run in circles for 8 minutes straight, attacking leaves and fruitlessly chasing birds.                             Eventually you calm down. You survey your surroundings, and find you are exactly where you started`);
				}
			},
		},
		connections: {
			"(n|kitchen)": () => {
				print(`After some waiting around, you convince baba to let you back in.`);
				goTo("kitchen");
			},
			"(s|forest)": () => {
				print(`You journey off into the forest, and after having a good time and chase some squirrels, you realize you actually have zero idea where you are.                             You sit down and meow until nighttime... when the wild turkey attacks.`);
				endGame(1)
			},
			"(w|front|path)": () => {
				print(`You are immediately startled by a leaf in the wind, and you bolt the nearest tree.
You climb and you climb until you can't climb anymore. You look down. You're so high! You feel accomplished.


You can't get down.`);
				endGame(3)
			},
		},
	},
	dining_room: {
		name: "dining_room",
		commands: {
			"l": (args) => {
				if (!args || !args[0]) {
					t.clear();
					print(`You're in the dining room, where the food and water bowls are. You like to sneak up on lulu when she's eating, but she isn't here right now.
N: The entryway
S: The kitchen
W: The office
D: The basement, but you don't need to go down there
- There's food here
- There's water here`);
				} else if (args[0] == 'water') {
					print(`This water is not good enough for chichien`);
				} else if (args[0] == 'food') {
					print(`The food looks tasty`);
				}
			},
			"g": (args) => {
				if (!args || !args[0]) {
				} else if (args[0] == 'food') {
					if (variables["You have eaten food"]) {
						print(`You've already eaten food, but you force yourself to eat more anyway.`);
						variables["You have eaten food"] = (variables["You have eaten food"] ? variables["You have eaten food"] + 1 : 1)
					}
					else {
						print(`You eat some of the food, you're not as hungry anymore`);
						variables["You have eaten food"] = 1
					}
				} else if (args[0] == 'water') {
					print(`The water here is gross, you don't want to drink it. Your water has to be *sophisticated*`);
				}
			},
		},
		connections: {
			"(n|entryway|entry)": () => {
				print(`You go to the entryway`);
				goTo("entryway");
			},
			"(s|kitchen)": () => {
				print(`You wander into the kitchen`);
				goTo("kitchen");
			},
			"(w|office)": () => {
				print(`You go to the office`);
				goTo("office");
			},
			"(d|downstairs)": () => {
				print(`Down there is just the pathetic litter pan, that's not good enough for chichien. You sit at the top of the stairs for a while contemplating cat things`);
			},
		},
	},
	office: {
		name: "office",
		commands: {
			"l": (args) => {
				if (!args || !args[0]) {
					t.clear();
					print(`You're in the office, baba is here working on his laptop. You like baba, baba gives nice pets.
N: Living room
E: Dining room
- Baba is here`);
				} else if (args[0] == 'baba') {
					print(`Baba is watching the blinking lights on the laptop`);
				}
			},
			"meow": (args) => {
				if (!args || !args[0]) {
				} else if (args[0] == 'baba') {
					print(`You meow at baba, he turns around and makes weird baby noises at you and picks you up. You can see his computer, type 'watch' to look at it.`);
				}
			},
			"u": (args) => {
				if (!args || !args[0]) {
				} else if (args[0] == 'baba') {
					print(`You jump up and sit on babas lap. You can see his computer, type 'watch' to look at it.`);
				}
			},
			"watch": (args) => {
				print(`The more you watch, the more enthralled you become. Pictures are moving around the screen! It's very entertaining for a cat. You lose your mind to this hypnotic state.`);
				endGame(2)
			},
		},
		connections: {
			"(n|living)": () => {
				print(`You go over to the living room`);
				goTo("living_room");
			},
			"(e|dining)": () => {
				print(`You go to the dining room`);
				goTo("dining_room");
			},
		},
	},
	living_room: {
		name: "living_room",
		commands: {
			"l": (args) => {
				if (!args || !args[0]) {
					t.clear();
					print(`You are in the living room, one of your favorites! Mumu is sleeping in her cat bed. There's an empty glass on the table.
N: The window
E: Entryway
S: The office
- Mumu is here
- There's an empty glass on the table.`);
				} else if (args[0] == 'mumu') {
					print(`Mumu looks sad`);
				} else if (args[0] == 'water') {
					print(`The glass is empty :(`);
				} else if (args[0] == 'window') {
					print(`You look out the window and chatter at some birds. You know you can't catch them, but it's fun to watch anyways`);
				}
			},
			"meow": (args) => {
				if (!args || !args[0]) {
				} else if (args[0] == 'mumu') {
					print(`You meow at mumu, she replies:

"My meow meow's gone awayyy
I'll now be sad throughout the day!
There's just nothing else to say!
Meow meow's goneeee, meow meow's goneeeee!"`);
				}
			},
			"g": (args) => {
				if (!args || !args[0]) {
				} else if (args[0] == 'water') {
					print(`The glass is empty, so you can't drink from it. You meow at baba, but he's too "busy" watching the blinking lights`);
				}
			},
			"v": (args) => {
				if (!args || !args[0]) {
				} else if (args[0] == 'mumu') {
					if (!args || !args[1]) {
						print(`What do you want to give mumu?`);
					} else if (args[1] == 'sock') {
						if (variables["A sock"]) {
							print(`You give mumu the sock, and she is instantly comforted. She thanks you by telling you how to finally defeat the wretched lulu

"Mbpthh mfthh mphh mmm pfhht mbt mbewow..."

...prehaps her mouth was too full`);
							variables["A sock"] = 0
						}
						else {
							print(`You don't have a sock`);
						}
					}
				}
			},
			"break": (args) => {
				if (!args || !args[0]) {
					print(`What do you want to break?`);
				} else if (args[0] == 'water') {
					if (variables["broken"]) {
						print(`The glass is already on the ground`);
					}
					else {
						print(`You push the empty glass off the table and it falls onto the carpet, it doesn't break`);
						variables["broken"] = -1
					}
				} else if (args[0] == 'window') {
					print(`Chichien is not stronk enough`);
				}
			},
		},
		connections: {
			"(e|entry)": () => {
				print(`You go to the entryway`);
				goTo("entryway");
			},
			"(s|office)": () => {
				print(`You gallop as fast as you possibly can to the office. Very fun`);
				goTo("office");
			},
			"(n|window)": () => {
				print(`You look out the window and chatter at some birds. You know you can't catch them, but it's fun to watch anyways`);
			},
		},
	},
	entryway: {
		name: "entryway",
		commands: {
			"l": (args) => {
				if (variables["lulu"]) {
					t.clear();
					print(`You're in the entryway. It's pretty dirty. The door leads outside.
N: Outside
E: Hallway
S: Dining room
W: Living room`);
				}
				else {
					t.clear();
					print(`You're in the entryway. It's pretty dirty. The door leads outside. You see the dreaded lulu at the end of the hall, she trots into emily's room
E: Hallway
S: Dining room
W: Living room`);
					variables["lulu"] = -1
				}
			},
		},
		connections: {
			"(n|outside)": () => {
				if (variables["You have eaten food"] && variables["You have had a drink"] && variables["You are well rested"]) {
					print(`You are ready. You are excited. You are so excited. You bound over and meow at baba until he lets you outside. As soon as you're out you bolt for the forest and climb up a tree.
You climb and you climb until you can't climb anymore. You look down. You're so high! You feel accomplished.


You can't get down.`);
					endGame(3)
				}
				else {
					print(`You're not ready to go outside yet, you need to be well fed, have a drink, and rest first`);
				}
			},
			"(s|dining)": () => {
				print(`You go into the dining room`);
				goTo("dining_room");
			},
			"(w|living)": () => {
				print(`You see a yellow ball, and bat it into the living room. You lose it again after 0.01ms`);
				goTo("living_room");
			},
			"(e|hall|hallway)": () => {
				print(`You go down the hallway a little bit.`);
				goTo("hallway1");
			},
		},
	},
	hallway1: {
		name: "hallway1",
		commands: {
			"l": (args) => {
				t.clear();
				print(`You are in the middle of the hallway, James' door is closed. You suspect he's in there, but doesn't want to be bothered right now.
E: Hallway
S: Bathroom
W: Entryway`);
			},
			"meow": (args) => {
				if (!args || !args[0]) {
				} else if (args[0] == 'james') {
					print(`He doesn't respond, oh well`);
				}
			},
		},
		connections: {
			"(e|hall|hallway)": () => {
				print(`You continue down the hallway`);
				goTo("hallway2");
			},
			"(s|bathroom)": () => {
				print(`You journey into the bathroom`);
				goTo("bathroom");
			},
			"(w|entry|entryway)": () => {
				print(`You go to the entryway`);
				goTo("entryway");
			},
		},
	},
	hallway2: {
		name: "hallway2",
		commands: {
			"l": (args) => {
				if (!args || !args[0]) {
					t.clear();
					print(`You are at the end of the hallway, Emily's door is next to you, and you see Lulu's ugly face peering at you from on top of the bed
N: Emily's room
S: Meow's room
W: Hallway`);
				} else if (args[0] == 'lulu') {
					print(`You don't like Lulu very much, probably best to keep your distance`);
				} else if (args[0] == 'emily') {
					print(`She's snickering at you from her bed`);
				}
			},
			"meow": (args) => {
				if (!args || !args[0]) {
				} else if (args[0] == 'lulu') {
					print(`She mockingly meows back at you`);
				} else if (args[0] == 'emily') {
					print(`She calls you stupid, as usual...`);
				}
			},
		},
		connections: {
			"(n|emilys|emily|lulu)": () => {
				print(`You enter Emily's room... very cautiously... and then out of nowhere Lulu leaps off the bed and attacks you. You're too nice to hurt even a monster like her, so you succumb to your fate...`);
				endGame(4)
			},
			"(s|meow|master|bedroom)": () => {
				print(`You enter the master bedroom`);
				goTo("meow_room");
			},
			"(w|hall|hallway)": () => {
				print(`You go down the hallway`);
				goTo("hallway1");
			},
		},
	},
	bathroom: {
		name: "bathroom",
		commands: {
			"l": (args) => {
				if (!args || !args[0]) {
					t.clear();
					print(`You are in the bathroom. You can see the large, white bowl in the corner.
N: The hallway
E: Meow's bedroom
- There's a toilet here`);
				} else if (args[0] == 'water') {
					print(`Mmmm, toilet water`);
				}
			},
			"g": (args) => {
				if (!args || !args[0]) {
				} else if (args[0] == 'water') {
					print(`You jump up on the toilet and have a good long drink. You feel very refreshed! Best water in the house.`);
					variables["You have had a drink"] = 1
				}
			},
		},
		connections: {
			"(n|hall|hallway)": () => {
				print(`You go to the hallway`);
				goTo("hallway1");
			},
			"(e|meow|master|bedroom)": () => {
				print(`You go into Meow's room`);
				goTo("meow_room");
			},
		},
	},
	meow_room: {
		name: "meow_room",
		commands: {
			"l": (args) => {
				if (!args || !args[0]) {
					t.clear();
					print(`You are in Meow's room, she has lots of blankets. You see your sleeping bag nest in the corner of the room.
N: Hallway
W: The bathroom
- Your sleeping bag nest is here
- There's a pile of socks on the ground here`);
				} else if (args[0] == 'bed') {
					print(`It's very cozy and warm`);
				}
			},
			"g": (args) => {
				if (!args || !args[0]) {
				} else if (args[0] == 'sock') {
					if (variables["A sock"]) {
						print(`You already have a sock, you can't carry another`);
					}
					else {
						print(`You pick up a sock, it smells like meow meow`);
						variables["A sock"] = 1
					}
				}
			},
			"u": (args) => {
				if (!args || !args[0]) {
				} else if (args[0] == 'bed') {
					print(`You curl up in your bed and take a nap. You dream that lulu got trapped outside and you never saw her again. Ah what a good dream, you feel much more rested now!`);
					variables["You are well rested"] = 1
				}
			},
		},
		connections: {
			"(n|hall|hallway)": () => {
				print(`You go to the hallway`);
				goTo("hallway2");
			},
			"(w|bathroom)": () => {
				print(`You go to the bathroom`);
				goTo("bathroom");
			},
		},
	},
	".*": (args) => {
		t.write("Chichien's brain is too smol to understand")
	},
};
aliases = [
["m", ["move", "go"]],
["n", ["north"]],
["s", ["south"]],
["e", ["east"]],
["w", ["west"]],
["u", ["up"]],
["d", ["down"]],
["m n", ["n"]],
["m s", ["s"]],
["m e", ["e"]],
["m w", ["w"]],
["m u", ["u"]],
["m d", ["d"]],
["l", ["look"]],
["h", ["halp", "help"]],
["i", ["inventory", "inv"]],
["i", ["l i"]],
["water", ["glass", "toilet"]],
["v", ["give", "provide", "throw"]],
["g", ["pick up", "get", "grab", "obtain", "eat", "drink"]],
["u bed", ["sleep", "rest", "slep"]],
["bed", ["nest", "sleeping bag", "floor"]],
["u", ["use", "interact", "sleep", "slep", "rest", "sit", "climb", "nap"]],
["meow", ["talk", "say"]],
["clr", ["clear", "cls"]],
["kill", ["murder", "stab", "attack"]],
["break", ["smash", "destroy", "push"]],
["james", ["jayjay", "jaja"]],
["emily", ["emmy"]],
["lulu", ["lucy"]],
["mumu", ["moppet"]],
["chichien", ["lucky"]],
["", ["\bon", "in", "with", "to", "for", "at", "from", "the", "about", "into", "near", "after", "as", "like", "since", "after", "off", "above", "below", "and", "but\b"]],
];

