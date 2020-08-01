import React from 'react'
import Select from 'react-select'
import skillsArray from '../../components/SkillsArray'




export default function Skills(props) {

    return (
        <div>
            <Select isMulti onChange={props.setSkills} options={skillsArray}/>
        </div>
    )
}
