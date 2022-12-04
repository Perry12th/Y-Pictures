//Test Cases for Y-Pictures Projects
assert = chai.assert;
expect = chai.expect;

describe('Testing the functions of the Y-Pictures Projects', function(){

/*1 - images work
2- audio work
3- weather api work
4- search function returns the right image
*/

    it('Test 1: each of the following image searches returns a correct result', function(){
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
            "Minecraft",
            "dsfrgessrgseg" //this should fail
        ];

        for(var i = 0; i < imageSearchNames.length; i++){
            sendQuery(imageSearchNames[i], check)

            function check(data, status){
                var parsedData = JSON.parse(data);    
                var paths = JSON.parse(parsedData["paths"]);
                var names = JSON.parse(parsedData["names"]);
                //the search is actually correct (contains the search string)
                assert(paths.includes(imageSearchNames[i])==true);
                assert(names.includes(imageSearchNames[i])==true);
            }
        }

    });
    it('Test 2: ', function(){

    });
    it('Test 3: ', function(){

    });
    it('Test 4: ', function(){

    });
});