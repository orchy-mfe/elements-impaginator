import {Subject} from 'rxjs'

import {Configuration} from '../models/Configuration'

export const observableConfiguration = new Subject<Configuration | undefined>()
