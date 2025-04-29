import { useLocation } from 'react-router-dom'
import { routes } from '../routes/route'

const translationMap = {
    news: 'Tin tức',
    home: 'Trang chủ',
    'entry-test': 'Kiểm tra đầu vào',
    ranking: 'Xếp hạng',
}

export function useBreadcrumbs(extraItems = []) {
    const location = useLocation()
    const pathSegments = location.pathname.split('/').filter(Boolean)

    const breadcrumbs = pathSegments
        .filter((segment) => !/^[a-zA-Z0-9]{6,}$/.test(segment))
        .map((segment, index) => {
            const isLast = index === pathSegments.length - 1
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`

            return {
                label: translationMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
                to: isLast ? null : path,
            }
        })

    breadcrumbs.unshift({ label: translationMap.home, to: routes.home })

    return [...breadcrumbs, ...extraItems]
}
