export const truncate = (item) => {
    if(item.length > 50){
        return item.slice(0, 46) + "..."
    }
    return item
}