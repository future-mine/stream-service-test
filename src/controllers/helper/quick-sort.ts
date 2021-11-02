export function quicksort(arr: any[], func: (item: any) => number): any[] {
    if (arr.length <= 1) {
        return arr
    }

    var pivot = arr[0]

    var left = []
    var right = []

    for (var i = 1; i < arr.length; i++) {
        func(arr[i]) < func(pivot) ? left.push(arr[i]) : right.push(arr[i])
    }

    return quicksort(left, func).concat(pivot, quicksort(right, func))
}
