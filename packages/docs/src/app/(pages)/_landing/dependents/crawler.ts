import * as cheerio from 'cheerio'

enum PackageId {
  nuqs = 'UGFja2FnZS00MjczNzAxNTA5',
  nextUseQueryState = 'UGFja2FnZS0xMTYwOTg5NDIx'
}

type Result = {
  repo: string
  stars: number
  pkg: string
  img: string
}

export async function crawlDependents() {
  const allResults: Result[] = []
  let url = `https://github.com/47ng/nuqs/network/dependents?package_id=${PackageId.nuqs}`
  while (true) {
    const { results, nextPage } = await crawlDependentsPage(url)
    allResults.push(...results)
    if (nextPage === null) {
      break
    }
    url = nextPage
  }
  url = `https://github.com/47ng/nuqs/network/dependents?package_id=${PackageId.nextUseQueryState}`
  while (true) {
    const { results, nextPage } = await crawlDependentsPage(url)
    allResults.push(...results)
    if (nextPage === null) {
      break
    }
    url = nextPage
  }
  return allResults
    .sort((a, b) => b.stars - a.stars)
    .filter(
      // remove duplicates by repo
      (result, index, self) =>
        index === self.findIndex(r => r.repo === result.repo)
    )
    .slice(0, 100)
}

async function crawlDependentsPage(url: string) {
  const pkg =
    new URLSearchParams(url.split('?')[1]).get('package_id') === PackageId.nuqs
      ? 'nuqs'
      : 'next-usequerystate'
  const html = await fetch(url).then(res => res.text())
  const $ = cheerio.load(html)
  const results: Result[] = []
  $('[data-test-id="dg-repo-pkg-dependent"]').each((index, element) => {
    const img = $(element).find('img').attr('src')?.replace('s=40', 's=64')
    const repoLink = $(element).find('a[data-hovercard-type="repository"]')
    const starsStr = $(element)
      .find('a[data-hovercard-type="repository"]')
      .parent()
      .next()
      .text()
      .trim()
    const ownerStr = $(element)
      .find('a[data-hovercard-type="repository"]')
      .prev()
      .text()
      .trim()
    const stars = parseInt(starsStr.replace(/,/g, ''), 10)
    if (!isNaN(stars) && repoLink.length > 0 && ownerStr.length > 0 && img) {
      const repoName = repoLink.text()
      const repo = `${ownerStr}/${repoName}`
      if (!['franky47', '47ng'].includes(ownerStr)) {
        results.push({ repo, stars, pkg, img })
      }
    }
  })
  const nextButton = $('div.paginate-container a:contains(Next)')
  const nextPage = nextButton?.attr('href') ?? null
  return { results, nextPage }
}
