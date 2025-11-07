import React, { useEffect, useState } from 'react'
import useDataQuery from '../../hooks/useDataQuery';
import styles from './categoryfilter.module.css'

function CategoryFilter({ changefilter, setCategoryIds, categoryIds, setFilterValue }) {
    const [selectedCat, setSelectedCat] = useState([]);

    useEffect(() => {

        console.log({ selectedCat });
        changefilter(selectedCat)
    }, [selectedCat]);

    const [categorydata, errors] = useDataQuery({
        key: "/public/get-categories",
        data: {},
    });
    console.log("categorydata ", categorydata);
    const categories = categorydata?.data?.categories
    console.log({ categories });
    return (
        <div>
            <div className={styles.categoryContainer}>
                <span className={styles.categoryTitle}>Categories</span>
                <div className={styles.categories}>
                    <ul className={styles.inputList}>
                        {categories && categories.map((cat) => (
                            <li key={cat._id} className={styles.list}>
                                <label className={styles.container}>
                                    {cat.name}
                                    <input type="checkbox"
                                        name='category'
                                        value={cat._id}

                                        onChange={(e) => {
                                            const { value, checked } = e.target
                                            if (checked) {
                                                console.log('category value', { value });
                                                //setFilterValue(`category._id:${value}`)
                                                setSelectedCat(dat => [...dat, `category._id:${value}`])
                                            }
                                            if (!checked) {
                                                const dat = selectedCat.filter((dat) => {
                                                    return dat !== `category._id:${value}`
                                                })
                                                console.log('select', { dat });
                                                setSelectedCat(dat)
                                            }

                                        }} />

                                    <span className={styles.checkmark} />
                                </label>
                            </li>
                        ))}


                    </ul>
                </div>
            </div>

        </div>
    )
}

export default CategoryFilter