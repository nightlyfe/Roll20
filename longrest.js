on ("chat:message", function (msg) {
if (msg.type == "api" && msg.content === "!longrest") { 
            		var tselection = msg.selected;
                    _.each(tselection, function(obj) {
                         objsource = getObj("graphic", obj["_id"]);
                         characterId = objsource.get("represents");
                         character = getObj("character", characterId);
						 maxhitdie = getAttrByName(character.id, "inventorydescription57");
						 spenttoday = getAttrByName(character.id, "inventorydescription56");
						 currhitdie = getAttrByName(character.id, "inventorydescription60");
                         maxhealth = objsource.get("bar3_max");
						 recoverhd = Math.floor(spenttoday/2);
                         mystatuses = objsource.get("statusmarkers");
						
						//insert new blocks here
						if ((1* currhitdie + 1 * recoverhd) > maxhitdie){
							setAttr2('inventorydescription60', maxhitdie, characterId);
						}
						else {
							setAttr2('inventorydescription60', (1*currhitdie + 1*recoverhd), characterId);
						}
                        if (getAttrByName(character.id, "inventorydescription60") == maxhitdie) {
							setAttr2('inventorydescription56', '0', characterId);
						}
						objsource.set({bar3_value: (1*maxhealth)});
                        newhitdice = getAttrByName(character.id, "inventorydescription60");
                        sendChat(msg.who, "That was a nice nap. You now have " + maxhealth + " hit points and " + newhitdice + " hit dice.");
                        if(mystatuses.match(/half/gi)) {
            			    //sendChat(msg.who, "!token-mod --set statusmarkers|!half-heart")
                           sendChat(msg.who, '[You are less exhausted. Click Here.](!token-mod --set statusmarkers|?half-heart:-1)');
                        }
						//end insert new blocks
					})
                        

//begins setAttr2 function

 function setAttr2(name, currentVal, characterId) {
        if (!name) {
			throw('Name required to set attribute');
		}

		max = '';

		if (!currentVal) {
			sendChat('','Error setting empty value: ' + name);
			return;
		}

		var attr = findObjs({
			_type: 'attribute',
			_characterid: characterId,
			name: name
		})[0];

		if (!attr) {
			//log('Creating attribute ' + name);
			createObj('attribute', {
				name: name,
				current: currentVal,
				max: max,
				characterid: characterId
			});
		} else if (!attr.get('current') || attr.get('current').toString() !== currentVal) {
			//log('Updating attribute ' + name);
			attr.set({
				current: currentVal,
				max: max
			});
		}
	};  //ends setAttribute function						 
						 
						 
						 
						 
						 
                    }});



  
  
