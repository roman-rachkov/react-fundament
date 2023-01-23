import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import React from "react";

<div>
    <MyInput
        value={searchQuery}
        onChange={event => setSearcherQuery(event.target.value)}
    />
    <MySelect
        defaultValue='Sort by'
        onChange={value => setSelected(value)}
        value={selected}
        options={[
            {value: 'id', title: 'ID'},
            {value: 'title', title: 'Title'},
            {value: 'description', title: 'Description'},
        ]}
    />
</div>