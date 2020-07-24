import React from 'react'
import Select from 'react-select'
import skillsArray from '../../components/SkillsArray'



export default function Skills() {

    return (
        <div>
            <Select isMulti={true} options={skillsArray} defaultValue={skillsArray}/>
        </div>
    )
}
