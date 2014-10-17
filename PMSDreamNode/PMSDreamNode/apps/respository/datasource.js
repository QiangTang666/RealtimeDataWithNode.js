function profile()
{
    return randomIntFromInterval(-100, 100);
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

exports.profile=profile;