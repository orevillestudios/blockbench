// Initialize some stuff
let materialDirectoryCount = {};
let isMatGroupVisible = false;

// Create menu for right-click on groups
function createMaterialMenu() {    
    var bone_materials = getBoneMaterials();
    console.log(bone_materials);
    return {
        'name': 'Material Selection', 
        'icon': 'fa-fill-drip',
        'children' : bone_materials.map((material) => { 
            // Set Material Icons
            materialIcon = 'fa-droplet';

            // Set Remove Material icon to X
            if (material.value == null || material.value.length == 0)    {
                    materialIcon = 'fa-x';
            }

            return {
                icon : materialIcon,
                color : material.color,            
                name : material.name,
                click() {
                    // Build object of material counts
                    materialDirectoryCount = {}
                    countMaterialGroups();    

                    // Get currently selected group
                    let selectedGroup = getCurrentGroup();

                    // Remove material from cube
                    if (material.value == "") {
                        // Move cuvbe to parent of current group
                        Outliner.selected.map((obj) => {
                            if (obj.title == 'Cube') {
                                obj.material = '';
                                obj.materialColor = '';
                                obj.addTo(selectedGroup.parent);
                            }
                        });

                        // remove material group
                        if (selectedGroup.parent != 'root') {
                            if (selectedGroup.children.length <= 0) {
                                selectedGroup.remove();
                            }
                        }
                    } else {
                        // Add material count
                        if (materialDirectoryCount[material.value] === NaN || materialDirectoryCount[material.value] === null) {
                            materialDirectoryCount[material.value] = 0;
                        }
                        materialDirectoryCount[material.value] += 1;

                        // create new group to add materials to
                        let newMaterialGroup = new Group(material.value + materialDirectoryCount[material.value]).init();

                        if (selectedGroup.children[0].material == null) {
                            // Set group parent to group we just pushed to
                            newMaterialGroup.addTo(selectedGroup);
                            
                        } else {
                            // Set group to parent of group
                            newMaterialGroup.addTo(selectedGroup.parent);
                        }

                        newMaterialGroup.isOpen = true;
                        newMaterialGroup.materialValue = material.value;

                        // Move cubes to new material group
                        Outliner.selected.map((obj) => {
                            if (obj.title == 'Cube') {
                                obj.material = material.value;
                                obj.materialColor = material.color;
                                obj.addTo(newMaterialGroup);

                                // remove material group if there are no children
                                if (selectedGroup.parent != 'root') {
                                    if (selectedGroup.children.length <= 0) {
                                        selectedGroup.remove();
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }),
    }
}

// Count materials and add initilize them to materialDirectoryCount object
function countMaterialGroups() {
    getAllGroups().map((child) => {
        if (child.title == 'Group') {
            getBoneMaterials().map((mat) => {
                // dumb javascript thing
                if (materialDirectoryCount[mat.value] === undefined) {
                    materialDirectoryCount[mat.value] = 0
                }
                if (child.name.includes(mat.value)) {
                    // Increment material group count
                    materialDirectoryCount[mat.value] += 1;
                }        
            })
        }
    });
}

// Append single element to group menu
function appendToCubeMenu(element) {
    // Generate new group menu that includes out custom elements
    var originalMenu = Cube.prototype.menu
    Cube.prototype.menu = new Menu([
        ...originalMenu.structure,
        '_',
        element
    ]);
}
