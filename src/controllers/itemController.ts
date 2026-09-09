import {type Item} from '../models/item.js' //required syntax for modern NodeNext settings

let items: Item[] = []; //type annotation; this is an empty array and whatever is passed here should match Item type/structure/properties

let currentId = 1;

export const addItem = (id: number, name: string, category: string, quantity: number, notes: string): Item => {
    const newItem: Item = {id: currentId++, name, category, quantity, notes}
    items.push(newItem)
    return newItem
}

export const getItems = (): Item[] => {
    return items;
} 

export const getItemById = (id: number): Item | undefined => {
    const item = items.find((item) => item.id === id)
    return item
}

export const updateItem = (id: number, updatedFields: Partial<Omit<Item, 'id'>>): Item | undefined => {
    const item = items.find((item) => item.id === id)
    if (!item) return undefined;
    
    //merging the new changes to the existing item
    Object.assign(item, updatedFields);
    return item;
}

export const deleteItem = (id: number): boolean => {
    const initialLength = items.length;
    items = items.filter((item) => item.id !== id)
    return items.length < initialLength //this will return true if an item was removed, otherwise false
}