on ("chat:message", function (msg) {
if (msg.type == "api" && msg.content === "!hitdie") { 
        			var tselection = msg.selected;
                    _.each(tselection, function(obj) {
                        var objsource = getObj("graphic", obj["_id"]);
                        var characterId = objsource.get("represents");
                        var character = getObj("character", characterId);
						var chardie = getAttrByName(character.id, "inventorydescription59");
						var conmod = getAttrByName(character.id, "inventorydescription58");
						var currhitdie = getAttrByName(character.id, "inventorydescription60");
						var maxhitdie = getAttrByName(character.id, "inventorydescription57");
                        var spenttoday = getAttrByName(character.id, "inventorydescription56");
                        var currhealth = objsource.get("bar3_value");
                        var maxhealth = objsource.get("bar3_max");
						var hurt = ((1*maxhealth)-(1*currhealth));
						var tokenname = objsource.get("name");

						//insert new blocks here
						if(1* currhitdie > 0){
						
							if (tokenname.match("Rak|Lenora|Mildred|Noz|Coll")) {  //deals with non-ceridwen player rolls
									sendChat('', '/roll [[1'+chardie+']]', function (ops) {
									rollresult = JSON.parse(ops[0].content)
									 var total = rollresult.total
										if (1*total  + 1*conmod < 1*hurt){
											objsource.set({bar3_value: (1*(1*currhealth + 1*total+1*conmod))});
										}
										else if(total  + conmod >hurt){
											objsource.set({bar3_value: (1*maxhealth)});
										}
										if (1*currhitdie >1){
											newcurrhitdie = ((1* currhitdie) - 1);
											//sendChat ('', "test value = " + newcurrhitdie);
											setAttr2 ('inventorydescription60', newcurrhitdie, characterId)
										}		
										else if(1*currhitdie == 1){
											newcurrhitdie = 0
											setAttr2 ('inventorydescription60', '0' ,characterId)
										}
								sendChat('', '@{' + tokenname +'|output_option} &{template:5eDefault} {{character_name=@{' + tokenname +'|character_name}}} @{' + tokenname +'|show_character_name} {{title=Spending Hit Dice}} {{subheader='+chardie+'}} {{rollname=HP regained}} {{roll=[[' + total + ' + @{' + tokenname +'|constitution_mod}]]}} {{effect=You have '+newcurrhitdie+' hit dice remaining}} @{' + tokenname +'|classactionhitdice}')
								setAttr2 ('inventorydescription56', (1*spenttoday + 1) ,characterId)
    							
									})
							}
						
							else if (tokenname == "Ceridwen") {  //deals with ceridwen non-beast shape player rolls
									sendChat('', '/roll [[1'+chardie+']]', function (ops) {
									rollresult = JSON.parse(ops[0].content)
									var total = rollresult.total
										if (1*total  + 1*conmod < 1*hurt){
											objsource.set({bar3_value: (1*(1*currhealth + 1*total+1*conmod))});
										}
										else if(total  + conmod >hurt){
											objsource.set({bar3_value: (1*maxhealth)});
										}
										if (1*currhitdie >1){
										newcurrhitdie = ((1* currhitdie) - 1);
										setAttr2 ('inventorydescription60', newcurrhitdie,characterId)}		
										else if(1*currhitdie == 1){
										newcurrhitdie = 0
										setAttr2 ('inventorydescription60', '0', characterId)}						
								sendChat('', '@{' + tokenname +'|output_option} &{template:5eDefault} {{character_name=@{' + tokenname +'|character_name}}} @{' + tokenname +'|show_character_name} {{title=Spending Hit Dice}} {{subheader='+chardie+'}} {{rollname=HP regained}} {{roll=[[' +total+ ' + @{' + tokenname +'|constitution_mod}]]}} {{effect=You have '+newcurrhitdie+' hit dice remaining}} @{' + tokenname +'|classactionhitdice}')
                                setAttr2 ('inventorydescription56', (1*spenttoday + 1) ,characterId)
							})
							}
							
							else if ( tokenname.indexOf( 'Ceridwen-' ) > -1 ) { //deals with  Ceridwen beast shape
									sendChat ('', "Trying the beastshape version");
									sendChat('', '/roll [[1'+chardie+']]', function (ops) {
									rollresult = JSON.parse(ops[0].content)
									var total = rollresult.total
									    if (1*total  + 1*conmod < 1*hurt){
											objsource.set({bar3_value: (1*(1*currhealth + 1*total+1*conmod))});
										}
										else if(1*total  + 1*conmod >hurt){
											objsource.set({bar3_value: (1*maxhealth)});
										}
										if (1*currhitdie >1){
										newcurrhitdie = ((1* currhitdie) - 1);
										setAttr2 ('inventorydescription60', newcurrhitdie, characterId)}		
										else if(1*currhitdie == 1){
										newcurrhitdie = 0
										setAttr2 ('inventorydescription60', '0' , characterId)}
											sendChat  ('',  '@{Ceridwen|output_option} &{template:5eDefault} {{character_name=@{Ceridwen|character_name}}} @{Ceridwen|show_character_name} {{title=Spending Hit Dice}} {{subheader='+chardie+'}} {{rollname=HP regained}} {{roll=[[' +total+ ' + @{Ceridwen|constitution_mod}]]}} {{effect=You have '+newcurrhitdie+' hit dice remaining}}@{Ceridwen|classactionhitdice}')
										setAttr2 ('inventorydescription56', (1*spenttoday + 1) ,characterId)	
								
						})
						} 
						else { sendChat ('', 'This is not a Player Character.');}
						

						}
						
						else if (1* currhitdie < 1){sendChat ('', "Sorry.  You have no hit die remaining. Please don't die.")}
						
						//end insert new blocks
						})
                       // setAttribute ('inventorydescription40', 'd8')
    					//hitdietype = ;
	                    // objsource.set({bar3_value: newcurrhealth});
                        // objsource.set({bar3_max: 27});
                         //objsource.set({name: 'Boopsnout'});

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
