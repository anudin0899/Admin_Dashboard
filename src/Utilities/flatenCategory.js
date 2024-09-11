
const createCategoryList = (categories, option = []) => {
    for (let cat of categories) {
        option.push({ value: cat._id, name: cat.name, type: cat?.type, });
        if (cat.children.length > 0) {
            createCategoryList(cat.children, option);
        }
    }
    return option;
}

export default createCategoryList;