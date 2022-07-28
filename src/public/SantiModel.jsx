/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'

export default function SantiModel({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('src/public/ErikaBoxing.glb')
  console.log('animations: ',animations);
  const { actions } = useAnimations(animations, group);
  console.log(actions);
  useEffect(() => {
    actions['Armature|mixamo.com|Layer0'].play();
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Erika_Archer_Meshes" rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Erika_Archer_Body_Mesh" geometry={nodes.Erika_Archer_Body_Mesh.geometry} material={materials.Body_MAT} skeleton={nodes.Erika_Archer_Body_Mesh.skeleton} />
          <skinnedMesh name="Erika_Archer_Clothes_Mesh" geometry={nodes.Erika_Archer_Clothes_Mesh.geometry} material={materials.Akai_MAT} skeleton={nodes.Erika_Archer_Clothes_Mesh.skeleton} />
          <skinnedMesh name="Erika_Archer_Eyelashes_Mesh" geometry={nodes.Erika_Archer_Eyelashes_Mesh.geometry} material={materials.Lashes_MAT} skeleton={nodes.Erika_Archer_Eyelashes_Mesh.skeleton} />
          <skinnedMesh name="Erika_Archer_Eyes_Mesh" geometry={nodes.Erika_Archer_Eyes_Mesh.geometry} material={materials.EyeSpec_MAT} skeleton={nodes.Erika_Archer_Eyes_Mesh.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('src/public/ErikaBoxing.glb')