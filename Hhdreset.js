on ("chat:message", function (msg) {
if (msg.type == "api" && msg.content === "!hdreset") { 
            		var tselection = msg.selected;
                    i = 0
                    _.each(tselection, function(obj) {
                         objsource = getObj("graphic", obj["_id"]);
                         characterId = objsource.get("represents");
                         character = getObj("character", characterId);
						 maxhitdie = getAttrByName(character.id, "inventorydescription57");
                         maxhealth = objsource.get("bar3_max");

						//insert new blocks here
                        setAttr2('inventorydescription56', '0', characterId)
                        setAttr2('inventorydescription60', maxhitdie, characterId)
                        objsource.set("bar3_value", maxhealth)

                    i++  
						//end insert new blocks
					})

                        sendChat(msg.who, "All Better.")
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



  
  
