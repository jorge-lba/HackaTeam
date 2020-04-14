const items = [ {
    num:12,
    res: 1
}, {
    num:12,
    res: 7
}, {
    num:37,
    res: 20
}, {
    num:98,
    res: 17
}, {
    num:44,
    res: 99
} ]

const res1 = items.filter( element => element.num === 12 ).filter( element => element.res === 7 )

const res2 = items.filter( element => {
    if(element.num !== 12 || element.res !== 7 ){
        return true
    }
    return false
        
})

console.log( res2 )