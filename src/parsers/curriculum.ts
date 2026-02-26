import type { Curriculum } from '@/types'
import { isExtendedStringOrDefault, isObject, isStringOrDefault } from './typeValidation'

export function parseCurriculum(value: unknown) {
  const cv: Curriculum = {
    Header: {
      UserName: '',
      Label: '',
    },
    Contact: {
      email: 'email@email',
      linkedin: 'linkedin.com/in/',
      github: 'github.com/',
    },
    Summary: [],
    CoreSkills: {
      languages: [],
      apis: [],
      databases: [],
      frontend: [],
      containers_devops: [],
      practices: [],
    },
    Experience: [],
  }

  if (!isObject(value)) {
    return cv
  }

  if (isObject(value.Header)) {
    cv.Header = {
      UserName: isStringOrDefault(value.Header.UserName, ''),
      Label: isStringOrDefault(value.Header.Label, ''),
    }
  }

  if (isObject(value.Contact)) {
    cv.Contact = {
      email: isExtendedStringOrDefault(value.Contact.email, 'email@email'),
      linkedin: isExtendedStringOrDefault(value.Contact.linkedin, 'linkedin.com/in/'),
      github: isExtendedStringOrDefault(value.Contact.github, 'github.com/'),
    }
  }

  if (isObject(value.CoreSkills)) {
    if (Array.isArray(value.CoreSkills.languages)) {
      cv.CoreSkills.languages = value.CoreSkills.languages.reduce((acc, item) => {
        acc.push(isStringOrDefault(item, undefined))
        return acc
      }, [])
    }

    if (Array.isArray(value.CoreSkills.apis)) {
      cv.CoreSkills.apis = value.CoreSkills.apis.reduce((acc, item) => {
        acc.push(isStringOrDefault(item, undefined))
        return acc
      }, [])
    }

    if (Array.isArray(value.CoreSkills.databases)) {
      cv.CoreSkills.databases = value.CoreSkills.databases.reduce((acc, item) => {
        acc.push(isStringOrDefault(item, undefined))
        return acc
      }, [])
    }

    if (Array.isArray(value.CoreSkills.frontend)) {
      cv.CoreSkills.frontend = value.CoreSkills.frontend.reduce((acc, item) => {
        acc.push(isStringOrDefault(item, undefined))
        return acc
      }, [])
    }

    if (Array.isArray(value.CoreSkills.containers_devops)) {
      cv.CoreSkills.containers_devops = value.CoreSkills.containers_devops.reduce((acc, item) => {
        acc.push(isStringOrDefault(item, undefined))
        return acc
      }, [])
    }

    if (Array.isArray(value.CoreSkills.practices)) {
      cv.CoreSkills.practices = value.CoreSkills.practices.reduce((acc, item) => {
        acc.push(isStringOrDefault(item, undefined))
        return acc
      }, [])
    }
  }

  if (Array.isArray(value.Summary)) {
    cv.Summary = value.Summary.reduce((acc, item) => {
      acc.push(isStringOrDefault(item, undefined))
      return acc
    }, [])
  }

  if (Array.isArray(value.Experience)) {
    cv.Experience = value.Experience.reduce<Curriculum['Experience']>((acc, item) => {
      if (!isObject(item)) {
        return acc
      }

      let desc: Array<string> = []

      if (Array.isArray(item.Description)) {
        desc = item.Description.reduce<Array<string>>((accc, item) => {
          accc.push(isStringOrDefault(item, undefined))
          return accc
        }, [])
      }

      acc.push({
        Label: isStringOrDefault(item.Label),
        CompanyName: isStringOrDefault(item.CompanyName),
        StartDate: new Date(item.StartDate as string),
        EndDate: item.EndDate ? new Date(item.EndDate as string) : null,
        Description: desc,
      })
      return acc
    }, [])
  }

  return cv
}
