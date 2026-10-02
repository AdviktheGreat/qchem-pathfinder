import { defineBiologyNiche } from "@/data/pathfinders/computational-biology/niche-defaults";

export const comparativeGenomicsDirections = [
  defineBiologyNiche({
    id: "comparative-genomics-conservation",
    area: "Genomes and evolution",
    name: "Comparative genomics & conserved biology",
    shortDescription:
      "Compare genomes across species to find shared, changed, and lineage-specific biological features.",
    explanation:
      "Comparative genomics places DNA sequences from different species into a common frame. Researchers look for regions that stayed similar, changed rapidly, duplicated, disappeared, or moved, then ask what those patterns suggest about function and evolution. The work combines careful sequence comparison with biological context rather than treating similarity alone as proof of a shared role.",
    questions: [
      "Which genes or regulatory regions are unusually conserved across a group of species?",
      "Where did gene duplication, loss, or genome rearrangement occur during evolution?",
      "Which lineage-specific sequence changes may relate to a biological trait?",
    ],
    systems: [
      "Vertebrate and plant genomes",
      "Microbial and fungal species groups",
      "Conserved developmental genes",
      "Gene families with repeated duplication and loss",
    ],
    approaches: [
      {
        name: "Whole-genome alignment",
        explanation:
          "Alignment methods place related genome regions together so conservation, insertions, deletions, and rearrangements can be compared.",
      },
      {
        name: "Synteny and gene-family analysis",
        explanation:
          "Researchers compare gene order and related gene copies to reconstruct how genome organization changed.",
      },
      {
        name: "Conservation scoring",
        explanation:
          "Statistical models estimate whether a sequence changed more slowly or quickly than expected under an evolutionary baseline.",
      },
    ],
    concepts: [
      "DNA sequence and genome organization",
      "Sequence alignment and homology",
      "Gene duplication and gene families",
      "Evolutionary conservation and change",
    ],
    preparation:
      "Begin with one small gene family across a few well-annotated species. Learn what an alignment can and cannot establish, then connect conserved regions to independent functional evidence before moving to whole genomes.",
    keywords: [
      "comparative genomics",
      "genome alignment",
      "sequence conservation",
      "synteny",
      "gene family evolution",
      "ortholog",
      "genome rearrangement",
    ],
    synonyms: [
      "cross-species genome comparison",
      "evolutionary genomics",
      "comparative genome analysis",
    ],
    searches: {
      orientation: "comparative genomics sequence conservation overview",
      focused:
        "whole genome alignment synteny gene family evolution comparative genomics",
      review: "recent review comparative genomics conservation methods",
    },
    comparisonLens:
      "Compared with population genomics, this direction usually compares species or deep lineages rather than variation among individuals within one population.",
    explorationFriendly: true,
  }),
  defineBiologyNiche({
    id: "genome-annotation-function",
    area: "Genomes and evolution",
    name: "Genome annotation & function discovery",
    shortDescription:
      "Identify genes and functional regions in a genome by combining sequence evidence and biological databases.",
    explanation:
      "A newly assembled genome is a long sequence, not yet a complete biological explanation. Genome annotation predicts where genes and other functional elements occur and proposes what they may do. Researchers combine sequence signals, similarity to known biology, expression evidence, and quality checks while keeping uncertain or species-specific features visible instead of forcing every region into a familiar label.",
    questions: [
      "Where are protein-coding genes, RNA genes, and regulatory elements located?",
      "What function is supported for an unfamiliar gene, and how strong is that evidence?",
      "Which apparent genes may instead be assembly errors, fragments, or inactive copies?",
    ],
    systems: [
      "Newly sequenced microbial genomes",
      "Non-model plant and animal genomes",
      "Environmental genome assemblies",
      "Gene families with many uncharacterized members",
    ],
    approaches: [
      {
        name: "Gene prediction",
        explanation:
          "Algorithms combine sequence patterns and evidence to propose the boundaries and structure of genes.",
      },
      {
        name: "Similarity and domain search",
        explanation:
          "Sequence matches and conserved protein domains provide evidence for possible molecular functions.",
      },
      {
        name: "Evidence integration and quality control",
        explanation:
          "Expression data, reference databases, and consistency checks are combined to rank annotations and flag uncertainty.",
      },
    ],
    concepts: [
      "Genes, transcripts, and translated proteins",
      "Sequence similarity and conserved domains",
      "Reference databases and evidence provenance",
      "False positives, missing annotations, and uncertainty",
    ],
    preparation:
      "Start with a small microbial genome or one genomic region and compare an automated annotation with curated database records. Record what evidence supports each proposed function and where the label remains uncertain.",
    keywords: [
      "genome annotation",
      "gene prediction",
      "functional annotation",
      "protein domain",
      "sequence homology",
      "annotation quality",
      "gene ontology",
    ],
    synonyms: [
      "genome feature annotation",
      "functional genome annotation",
      "computational gene finding",
    ],
    searches: {
      orientation: "computational genome annotation beginner overview",
      focused:
        "gene prediction protein domain functional annotation evidence integration",
      review: "recent review genome annotation methods quality assessment",
    },
    comparisonLens:
      "Compared with comparative genomics, this direction centers locating and labeling functional features in one genome, although comparisons supply important evidence.",
  }),
];
