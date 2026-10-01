import type { Niche } from "@/lib/types";
import { materialsNicheDefaults } from "@/data/pathfinders/computational-materials/niche-defaults";

export const softBiomaterialDirections: Niche[] = [
  {
    ...materialsNicheDefaults,
    id: "polymers-soft-materials",
    area: "Soft materials",
    name: "Polymers & soft-material simulation",
    shortDescription:
      "Follow flexible molecules and assemblies whose behavior depends strongly on motion, environment, and scale.",
    explanation:
      "Polymers, gels, liquid crystals, and other soft materials reorganize under temperature, solvent, concentration, force, or fields. Their behavior comes from many conformations and weak interactions rather than one rigid structure. Simulation connects molecular flexibility and self-assembly to mechanical, transport, and responsive properties.",
    questions: [
      "How do chain length, sequence, or branching change structure and motion?",
      "What interactions drive self-assembly into a particular morphology?",
      "How does a soft material deform or respond to solvent, heat, or force?",
    ],
    systems: [
      "Polymer melts and solutions",
      "Hydrogels and responsive networks",
      "Block-copolymer assemblies",
      "Liquid crystals and flexible composites",
    ],
    approaches: [
      {
        name: "Molecular dynamics",
        explanation:
          "Atomistic trajectories reveal conformations, local interactions, and motion over accessible timescales.",
      },
      {
        name: "Coarse-grained simulation",
        explanation:
          "Groups of atoms are represented by simplified particles so larger assemblies and slower changes can be explored.",
      },
      {
        name: "Monte Carlo and statistical modeling",
        explanation:
          "Sampling methods compare many configurations and connect molecular choices to equilibrium structure and response.",
      },
    ],
    concepts: [
      "Molecular conformations and entropy",
      "Weak interactions and solvation",
      "Self-assembly",
      "Mechanical and responsive behavior",
    ],
    preparation:
      "Begin by visualizing a short chain or small assembly under two conditions. Probability, ensembles, and coarse-graining become easier to learn when tied to one observable change in shape or organization.",
    keywords: [
      "polymer simulation",
      "soft materials",
      "molecular dynamics",
      "coarse graining",
      "self assembly",
      "hydrogel",
      "polymer conformation",
    ],
    synonyms: [
      "computational soft matter",
      "macromolecular materials modeling",
      "polymer molecular simulation",
    ],
    searches: {
      orientation: "computational polymers soft materials simulation overview",
      focused:
        "molecular dynamics coarse grained polymer self assembly responsive material",
      review: "recent review molecular simulation polymers soft materials",
    },
    affinities: {
      "interest:soft-materials": 3,
      "mode:explain": 2,
      "mode:predict": 2,
      "mode:dynamics": 3,
      "mode:design": 2,
      "family:soft": 3,
      "family:amorphous": 2,
      "family:composite": 2,
      "phenomenon:mechanical": 2,
      "phenomenon:thermal": 1,
      "purpose:fundamental": 2,
      "purpose:applied": 2,
      "scale:multiscale": 3,
      "change:dynamic": 3,
      "medium:visual": 3,
      "style:coding": 2,
    },
    reasons: [
      {
        signal: "interest:soft-materials",
        category: "interest",
        text: "You chose flexible or responsive materials whose surroundings shape their behavior.",
      },
      {
        signal: "mode:dynamics",
        category: "interest",
        text: "Soft-material simulation follows changing conformations and collective motion over time.",
      },
      {
        signal: "family:soft",
        category: "style",
        text: "Polymers and soft matter were the material family you most wanted to explore.",
      },
      {
        signal: "medium:visual",
        category: "style",
        text: "Trajectories and structural snapshots make the assembly process visible in this field.",
      },
    ],
    comparisonLens:
      "Compared with biomaterials, this direction centers general soft-matter structure, motion, and response without requiring a biological interface or function.",
  },
  {
    ...materialsNicheDefaults,
    id: "computational-biomaterials",
    area: "Biomaterials and interfaces",
    name: "Computational biomaterials",
    shortDescription:
      "Model how designed materials interact with water, membranes, proteins, cells, and biological forces.",
    explanation:
      "A biomaterial’s performance depends on its interface with a complex, wet, dynamic environment. Molecular and multiscale simulations help explain hydration, ion organization, membrane response, protein adsorption, scaffold mechanics, and transport while making clear which biological features the model includes or leaves out.",
    questions: [
      "How does surface chemistry change hydration or protein adsorption?",
      "How does a material perturb a membrane or other biological assembly?",
      "Which molecular and mechanical features support a desired biological response?",
    ],
    systems: [
      "Implant and coating interfaces",
      "Hydrogels and tissue scaffolds",
      "Lipid membranes near materials",
      "Drug-delivery and biosensing materials",
    ],
    approaches: [
      {
        name: "Atomistic molecular dynamics",
        explanation:
          "Detailed trajectories show water, ions, lipids, proteins, and material surfaces interacting over time.",
      },
      {
        name: "Coarse-grained and enhanced sampling",
        explanation:
          "Reduced models and targeted sampling reach larger structures or rarer events than straightforward atomistic simulation.",
      },
      {
        name: "Multiscale mechanics and transport",
        explanation:
          "Molecular information can inform models of diffusion, deformation, or fluid flow in a scaffold or device.",
      },
    ],
    concepts: [
      "Noncovalent interactions and hydration",
      "Membranes and biological interfaces",
      "Diffusion and transport",
      "Multiscale structure and mechanics",
    ],
    preparation:
      "Start with one clearly defined interface and one observable such as adsorption, membrane disruption, or diffusion. Treat biological realism and model limitations as explicit parts of the literature review.",
    keywords: [
      "computational biomaterials",
      "biointerface simulation",
      "protein adsorption",
      "membrane material interaction",
      "hydrogel modeling",
      "molecular dynamics",
      "biomaterial surface",
    ],
    synonyms: [
      "biomaterials molecular simulation",
      "computational biointerfaces",
      "in silico biomaterial modeling",
    ],
    searches: {
      orientation: "computational biomaterials biointerface modeling overview",
      focused:
        "molecular dynamics hydration protein adsorption biomaterial surface",
      review:
        "recent review molecular simulation computational biomaterials interfaces",
    },
    affinities: {
      "interest:soft-materials": 3,
      "application:health": 3,
      "mode:explain": 3,
      "mode:interpret": 2,
      "mode:dynamics": 3,
      "mode:design": 2,
      "family:soft": 3,
      "family:composite": 2,
      "phenomenon:surfaces": 3,
      "phenomenon:ions": 1,
      "purpose:applied": 3,
      "scale:atomic": 2,
      "scale:multiscale": 3,
      "change:dynamic": 3,
      "connection:experiment": 2,
      "medium:visual": 3,
    },
    reasons: [
      {
        signal: "interest:soft-materials",
        category: "interest",
        text: "You were drawn to soft materials and structures that interact with living systems.",
      },
      {
        signal: "mode:interpret",
        category: "interest",
        text: "Simulation can help interpret difficult-to-isolate events at a wet biological interface.",
      },
      {
        signal: "phenomenon:surfaces",
        category: "style",
        text: "Interfaces between a material and its surroundings were central to your preferences.",
      },
      {
        signal: "scale:multiscale",
        category: "style",
        text: "Biomaterials often connect molecular interactions to larger structural or transport behavior.",
      },
    ],
    comparisonLens:
      "Compared with general polymer and soft-material simulation, this direction centers biological environments, biointerfaces, and the limits of modeling living complexity.",
  },
];
