import { useState, useEffect } from "react";

export async function getData() {
    const response = await fetch("https://62da64419eedb699636cf77d.mockapi.io/api/v1/foods");
    const data = await response.json();
    const dataToFilter = await Promise.allSettled(data.map(item => item)).then(results =>
        results.map(result => {
            if (result.status === "fulfilled") {
                return result.value;
            }
            return [];
        })
    );
    const replaceTags = dataToFilter.map(item => {
        let tagList = item.tags?.replace(/\s/g, "").split(",");
        let newTags = tagList.map(item => item.toLowerCase());
        item.tags = newTags;
        return item;
    });
    const res = replaceTags.filter(item => item && item.id);
    return res;
}

export default function useData() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        getData()
            .then(response => setList(response))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);
    return [loading, error, list];
}
