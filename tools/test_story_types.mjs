import assert from 'node:assert/strict';
import {storySubjectRefs,storyCoversSubject,rankStoriesForSubject,selectPreferredStoryForSubject} from '../js/core.js';

const wine={id:'story_wine',title:'Historia del vino',storyType:'subject',primarySubjectRef:'wine',relatedSubjectRefs:['wine']};
const fermentation={id:'story_fermentation',title:'Fermentación',storyType:'transversal',primarySubjectRef:null,relatedSubjectRefs:['wine','bread_like_flatbread','cheese']};
const conservation={id:'story_conservation',title:'Conservación',storyType:'transversal',primarySubjectRef:null,relatedSubjectRefs:['wine','cheese']};

assert.deepEqual(storySubjectRefs(wine),['wine']);
assert.deepEqual(storySubjectRefs(fermentation),['wine','bread_like_flatbread','cheese']);
assert.equal(storyCoversSubject(fermentation,'bread_like_flatbread'),true);
assert.equal(storyCoversSubject(fermentation,'maize'),false);
const ranked=rankStoriesForSubject([conservation,fermentation,wine],'wine');
assert.equal(ranked[0].id,'story_wine','la historia monográfica debe tener prioridad para su subject primario');
assert.deepEqual(rankStoriesForSubject([fermentation],'bread_like_flatbread').map(x=>x.id),['story_fermentation']);
assert.equal(selectPreferredStoryForSubject([fermentation,wine],'wine').id,'story_wine');
assert.equal(selectPreferredStoryForSubject([fermentation],'bread_like_flatbread').id,'story_fermentation');
assert.equal(selectPreferredStoryForSubject([fermentation,conservation],'cheese'),null,'dos transversales sin monográfica deben quedar ambiguas, no elegirse alfabéticamente');
console.log('STORY TYPES ALGORITHM: PASS');
