import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token:
    "skQOP0teZe6Fz42zPDuDseqg7qzXcEaRfmEp7Rj2Yh1EBSlGiuOi5Lk4if5r6hH2DhZo92qaxTTQixYuyqBFPfPPtdT7jCZIdu13dKybd4JIvLbGKSYnoEtCr0I4XiPFDDnJRsEbiVT4Jmk0ehe0vm0CjhVmmHuGRdGvRunr5jKfJ0xZiVPK",
})
