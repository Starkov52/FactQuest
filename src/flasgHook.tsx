import React from 'react'
import {searchFlags} from '../src/components/listUserTests'
import {readyTest} from '../src/App'
function useFlag(flagState:string, testSearch:readyTest[] ) {
    const [tests, setTests] = React.useState<readyTest[]>(testSearch)
    React.useEffect(() => {

        let newTestsArray:readyTest[] = [...testSearch]
        switch(flagState) {
            case `${searchFlags.countAccesDown}`: {
                newTestsArray.sort((a,b) => {return a[2] - b[2]})
          console.log(newTestsArray)
          setTests(newTestsArray)
          break;
            }
            case `${searchFlags.countAccesUp}`: {
                newTestsArray.sort((a,b) => b[2] - a[2])
                setTests(newTestsArray)
                console.log(newTestsArray)
                break;
            }
            case `${searchFlags.dateDown}`: {
                
                newTestsArray.sort((a,b) => new Date(b[6]).getTime() - new Date(a[6]).getTime())
                setTests(newTestsArray)
                console.log(newTestsArray)
                break;
            }
            case `${searchFlags.dateUp}`: {
                newTestsArray.sort((a,b) => new Date(a[6]).getTime() - new Date(b[6]).getTime())
                setTests(newTestsArray)
                console.log(newTestsArray)
                break;
            }
            case `${searchFlags.starsDown}`: {
                newTestsArray.sort((a,b) => a[1] - b[1])
                setTests(newTestsArray)
                console.log(newTestsArray)
                break;
            }
            case `${searchFlags.starsUp}`: {
                newTestsArray.sort((a,b) => b[1] - a[1])
                setTests(newTestsArray)
                console.log(newTestsArray)
                break;
            }
            default: {
                console.log('ошибка')
            }
        }
    },[flagState, testSearch])
    React.useEffect(() => {console.log(tests)},[tests])
    return tests
}
export default useFlag