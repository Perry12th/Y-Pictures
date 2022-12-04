//Test Cases for Y-Pictures Projects
assert = chai.assert;
expect = chai.expect;

describe('Testing the functions of the Y-Pictures Projects', function () {
/*1 - images work
2- audio work
3- weather api work
4- search function returns the right image
*/

    it('Test 1: each of the following image searches returns a correct result', async function() {

        const imageSearchNames = [
            "Hollow Knight",
            "Elite Dangerous",
            "League of Legends",
            "God of War",
            "Legend of Zelda",
            "Terraria",
            "Tetris",
            "Forza Horizon 5",
            "Titanfall 2",
            "Minecraft"
        ];

        for(var i = 0; i < imageSearchNames.length; i++){
            var paths = getMatchingOf(imageSearchNames[i]);
            //the search is actually correct (contains the search string)
            assert(paths.toString().includes(imageSearchNames[i]));
        }

    });
    it('Test 2: Server contains the pathways for all images in the database', function(){
        var imagePaths = getImagePaths();
        assert.exists(imagePaths);
    });
    it('Test 3: GetImageNameFromPath returns just the image name from the inputted path based on forward slashes', function(){

    });
    it('Test 4: ', function(){

    });
});