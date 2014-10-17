

function profile() {
    return temp=randomIntFromCSharp();
}

function randomIntFromCSharp()
{
    var edge=require('edge');

    var clrMethod = edge.func({
        assemblyFile: __dirname+'\\MockDataSourceConnection.dll',
        typeName: 'MockDataSourceConnection.DataFactory',
        methodName: 'GetData'
        });
    var returnvalue;
    clrMethod(null, function(error, result) {
        if(error) throw error;
        returnvalue= parseInt(result);
        });
    return returnvalue;
}
exports.profile=profile;