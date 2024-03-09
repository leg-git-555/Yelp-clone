


export function extensionOk (str) {
    const extensions = [".png", ".jpg", ".jpeg"]
    let bool = false

        extensions.forEach(ex => {
            if (str.toLowerCase().endsWith(ex)) bool = true
        })

    return bool
}
